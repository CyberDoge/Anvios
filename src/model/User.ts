import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {compare} from "bcrypt";

export interface IUserSchema extends Document {
    token?: String,
    login?: String,
    password?: String
}

interface IUserModel extends Model<IUserSchema> {
    findIdByLoginAndPassword(login: string, password: string): Promise<string | null>;

    findIdByToken(token: string): Promise<string | null>
}

const userSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    },
    login: {
        type: String,
        unique: true,
        sparse: true,
        max: 20,
        min: 3,
    },
    password: {
        type: String,
        max: 20,
        min: 45,
    }
});


userSchema.statics.findIdByLoginAndPassword = async function (login: string, password: string): Promise<string | null> {
    const userIdAndPassword = await this.findOne({login}).select("_id password").lean();
    if (userIdAndPassword.password) {
        if (await compare(password, userIdAndPassword.password)) {
            return userIdAndPassword._id.toString();
        }
    }
    return null;
};

userSchema.statics.findIdByToken = async function (token: string): Promise<string | null> {
    return (await this.findOne({token}).select("_id").lean())?._id.toString() || null
};


export default mongoose.model<Document, IUserModel>("User", userSchema);