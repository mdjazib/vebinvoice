import authentication from "@/lib/authentication";
import { NextResponse } from "next/server";
export async function GET(req) {
    const cookie = req.url.split("login=")[1];
    const response = await authentication(cookie);
    return NextResponse.json(response);
}