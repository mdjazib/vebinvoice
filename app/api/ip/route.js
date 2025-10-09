import { NextResponse } from "next/server";

export function GET(req) {
    return NextResponse.json(req.headers.get("x-forwarded-for"));
}