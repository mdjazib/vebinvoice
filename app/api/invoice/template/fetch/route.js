import authentication from "@/lib/authentication";
import connection from "@/lib/db";
import template from "@/schema/template";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connection();
        const cookie = await cookies();
        const accountId = await authentication(cookie.get("__vi_xtc_edge").value);
        if (accountId === 400) return NextResponse.json(400);
        return NextResponse.json(await template.findOne({ accountId }));
    } catch (error) {
        return NextResponse.json(400);
    }
}