import connection from "@/lib/db";
import account from "@/schema/account";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connection();
    const formdata = await req.formData();
    const email = formdata.get("email");
    const isRegistered = await account.countDocuments({ email });
    const accountId = isRegistered ? (await account.findOne({ email }))._id : (await account.create({ email }))._id;
    console.log(accountId);
    return NextResponse.json(200);
}