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
        const cookie = await cookies();
        const accountId = await authentication(cookie.get("__vi_xtc_edge").value);
        if (accountId === 400) return NextResponse.json(400);
        const response = await customer.findOne({ accountId, email });
        return NextResponse.json(response === null ? {} : response);
    } catch (error) {
        return NextResponse.json(400);
    }
}