import connection from "@/lib/db";
import account from "@/schema/account";
import login from "@/schema/login";
import { NextResponse } from "next/server";
import rand from "random-key";
import bcrypt from "bcrypt";
import _token from "@/schema/token";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    await connection();
    const cookie = await cookies();
    const formdata = await req.formData();
    const deviceId = formdata.get("deviceId");
    const token = rand.generate(90);
    const email = formdata.get("email");
    const token_encoded = bcrypt.hashSync(token, 10);
    const token_ref = (await _token.create({ token: token_encoded, deviceId, email, expires: new Date(Date.now() + 30 * 60 * 1000) }))._id;
    const token_client = jwt.sign({ token: token_ref }, process.env.JWT_KEY);
    cookie.set("waiting_token_vebinvoice", token_client, { httpOnly: true, sameSite: "strict", maxAge: 30 * 60 });
    const token_link = `${req.headers.get("origin")}/auth?token=${token}`;
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: '"Veb Invoice" <invoice@vebedge.com>',
      to: email,
      subject: `Sign in securely to your Veb Invoice account #${Date.now()}`,
      html: `
  <div style="font-family: Arial, sans-serif; color: #000; background: #fff; padding: 30px;">
    <h2 style="margin-bottom: 15px;">Sign In</h2>
    <p style="margin: 0 0 20px 0;">This login link is available for the next 30 minutes.</p>
    <a href="${token_link}" 
       style="display: inline-block; background: #000; color: #fff; padding: 10px 35px; text-decoration: none; font-weight: bold;">
      Sign In
    </a>
    <p style="margin-top: 40px; font-size: 13px; color: #333;">Developed by Veb Edge.</p>
    <p style="margin-top: 10px; font-size: 12px; color: #555;">© 2025 Veb Invoice. All rights reserved.</p>
  </div>`,
    })
    return NextResponse.json(200);
  } catch (error) {
    return NextResponse.json(400);
  }
}

export async function GET(req) {
  try {
    await connection();
    const cookie = await cookies();
    const deviceId = req.url.split("=")[2];
    const original_token = req.url.split("=")[1].split("&")[0];
    const encoded_token = cookie.get("waiting_token_vebinvoice").value;
    const token_ref = jwt.verify(encoded_token, process.env.JWT_KEY).token;
    const decoded_token = await _token.findOne({ _id: token_ref });
    const verifyToken = bcrypt.compareSync(original_token, decoded_token.token);
    const authorized = verifyToken && deviceId === decoded_token.deviceId;
    if (authorized) {
      const email = decoded_token.email;
      const isRegistered = await account.countDocuments({ email });
      const accountId = isRegistered ? (await account.findOne({ email }))._id : (await account.create({ email }))._id;
      const isKnownDevice = await login.countDocuments({ accountId, deviceId });
      isKnownDevice && (await login.updateOne({ accountId, deviceId }));
      const loginId = isKnownDevice ? (await login.findOne({ accountId, deviceId })).ref : (await login.create({ ref: uuidv4(), accountId, deviceId })).ref;
      const securedLoginToken = jwt.sign(loginId, process.env.JWT_KEY);
      cookie.set("__vi_xtc_edge", securedLoginToken, { httpOnly: true, sameSite: "strict", maxAge: 15 * 24 * 60 * 60 });
      return NextResponse.json(200);
    } else {
      return NextResponse.json(400);
    }
  } catch (error) {
    return NextResponse.json(400);
  }
}