import * as mongoose from "mongoose";
import {Document, Model, Schema} from "mongoose";


export interface IThemeSchema extends Document {
    title: string;
    description?: string;
}

interface IThemeModel extends Model<IThemeSchema> {
    getSomeSortedByDateThemes(from: number, count: number): Promise<Array<IThemeSchema>>
}

const themeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: Date,
    votedUpIds: [Schema.Types.ObjectId],
    votedDownIds: [Schema.Types.ObjectId],
    winnerId: Schema.Types.ObjectId
});

themeSchema.statics.getSomeSortedByDateThemes = async function (from: number, count: number): Promise<Array<IThemeSchema>> {
    return this.find({}).sort("-data").skip(from).limit(count).lean()
};

const Theme = mongoose.model<IThemeSchema, IThemeModel>('Theme', themeSchema);

export default Theme;