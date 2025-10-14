import invoice from "@/schema/invoice";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    const response = (await invoice.findOne({ inv: id })).data;
    response.__v = undefined;
    response._id = undefined;
    response.accountId = undefined;
    response.createdAt = undefined;
    response.updatedAt = undefined;
    return NextResponse.json(response);
}