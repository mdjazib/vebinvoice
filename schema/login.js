import mongoose from "mongoose";

const loginSchema = mongoose.Schema(
    {
        ref: String,
        accountId: String,
        deviceId: String
    }, { timestamps: true }
)

export default mongoose.models.login || mongoose.model("login", loginSchema);