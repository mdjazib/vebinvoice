import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
    {
        token: String,
        deviceId: String,
        email: String,
        expires: {
            type: Date,
            index: { expires: 0 }
        }
    }, { timestamps: true }
)

export default mongoose.models.token || mongoose.model("token", tokenSchema);