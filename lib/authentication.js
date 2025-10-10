import jwt from "jsonwebtoken";
import login from "@/schema/login";
import account from "@/schema/account";

export default async function authentication(cookie) {
    try {
        const ref = jwt.verify(cookie, process.env.JWT_KEY);
        const accountId = (await login.findOne({ ref })).accountId;
        const isAccountExist = await account.countDocuments({ _id: accountId });
        if (isAccountExist) {
            return accountId;
        } else {
            return 400;
        }
    } catch (error) {
        return 400;
    }
}