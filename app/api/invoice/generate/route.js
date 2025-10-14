import authentication from "@/lib/authentication";
import connection from "@/lib/db";
import invoice from "@/schema/invoice";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connection();
        const cookie = await cookies();
        const formdata = await req.formData();
        const accountId = await authentication(cookie.get("__vi_xtc_edge").value);
        if (accountId === 400) return NextResponse.json(400);
        const inv = formdata.get("inv");
        const data = JSON.parse(formdata.get("invoice"));
        const isInvoiceExist = await invoice.countDocuments({ accountId, inv });
        if (!isInvoiceExist) await invoice.create({ accountId, inv, data });
        return NextResponse.json(inv);
    } catch (error) {
        return NextResponse.json(400);
    }
}