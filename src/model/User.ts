import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";

interface IUserSchema extends Document {
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
        unique: true
    },
    password: String
});


userSchema.statics.findIdByLoginAndPassword = async function (login: string, password: string): Promise<string | null> {
    return (await this.findOne({login, password}).select("_id").lean())?._id.toString() || null
};

userSchema.statics.findIdByToken = async function (token: string): Promise<string | null> {
    return (await this.findOne({token}).select("_id").lean())?._id.toString() || null
};


export default mongoose.model<Document, IUserModel>("User", userSchema);