import mongoose from "mongoose";

const templateSchema = mongoose.Schema(
    {
        accountId: String,
        company: Object,
        payment: Object,
        footer: Object,
        advanced: Object,
        further: Array
    }, { timestamps: true }
)

export default mongoose.models.template || mongoose.model("template", templateSchema);