import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
    {
        email: String,
        name: String,
        password: String,
        avatar: String,
    }, { timestamps: true }
)

export default mongoose.models.account || mongoose.model("account", accountSchema);