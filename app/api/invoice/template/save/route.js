import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import cloudinary from "cloudinary";
import connection from "@/lib/db";
import authentication from "@/lib/authentication";
import { cookies } from "next/headers";
import template from "@/schema/template";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

export async function POST(req) {
    try {
        await connection();
        const cookie = await cookies();
        const formdata = await req.formData();
        const data = JSON.parse(formdata.get("invoice"));
        const logo = formdata.get("logo");
        let logoURL;
        if (typeof logo === "string") {
            logoURL = logo.includes("res.cloudinary.com") ? logo : "";
        } else {
            const logoId = randomBytes(18).toString("hex");
            const logoBuffer = await logo.arrayBuffer();
            const finalLogo = Buffer.from(logoBuffer);
            cloudinary.v2.uploader.upload_stream(
                {
                    folder: "vebinvoice/company/logo",
                    public_id: logoId
                },
            ).end(finalLogo);
            logoURL = `https://res.cloudinary.com/dovjp1hzh/image/upload/v1760267799/vebinvoice/company/logo/${logoId}`;
        }
        const response = await authentication(cookie.get("__vi_xtc_edge").value);
        const company = data.company;
        const payment = data.payment;
        const footer = data.footer;
        const advanced = { ...data.advanced, logo: logoURL };
        const further = data.further;
        if (response === 400) {
            return NextResponse.json(400);
        } else {
            const accountId = response;
            const isTemplateExist = await template.countDocuments({ accountId });
            isTemplateExist ? await template.updateOne({ accountId }, { $set: { company, payment, footer, advanced, further } }) : await template.create({ accountId, company, payment, footer, advanced, further });
            return NextResponse.json(200);
        }
    } catch (error) {
        return NextResponse.json(400);
    }
}