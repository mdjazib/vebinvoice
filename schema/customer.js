import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
    {
        accountId: String,
        email: String,
        name: String,
        contact: String,
        address: String,
        abn: String
    }, { timestamps: true }
)

export default mongoose.models.customer || mongoose.model("customer", customerSchema)