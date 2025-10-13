import authentication from "@/lib/authentication";
import connection from "@/lib/db";
import customer from "@/schema/customer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connection();
        const formdata = await req.formData();
        const email = formdata.get("email");
        const name = formdata.get("name");
        const contact = formdata.get("contact");
        const address = formdata.get("address");
        const abn = formdata.get("abn");
        const cookie = await cookies();
        const accountId = await authentication(cookie.get("__vi_xtc_edge").value);
        if (accountId === 400) return NextResponse.json(400);
        const isCustomerExist = await customer.countDocuments({ accountId, email });
        isCustomerExist ? await customer.updateOne({ accountId, email }, { $set: { name, contact, address, abn } }) : await customer.create({ accountId, email, name, contact, address, abn });
        return NextResponse.json(200);
    } catch (error) {
        return NextResponse.json(400);
    }
}