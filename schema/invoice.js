import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
    {
        accountId: String,
        data: Object,
    }, { timestamps: true }
)

export default mongoose.models.invoice || mongoose.model("invoice", invoiceSchema);