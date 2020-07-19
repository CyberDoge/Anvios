import * as mongoose from "mongoose";
import {Document, Model, Schema} from "mongoose";
import NewThemeRequest from "../dto/NewThemeRequest";


export interface IThemeSchema extends Document {
    title: string;
    description?: string;
}

interface IThemeModel extends Model<IThemeSchema> {
    getSomeSortedByDateThemes(from: number, count: number): Promise<Array<IThemeSchema>>,

    createTheme(theme: NewThemeRequest): Promise<IThemeSchema>;
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
    if (count > 20) {
        count = 20;
    }
    return this.find({}).sort("-data").skip(from).limit(count).lean()
};

themeSchema.statics.createTheme = async function (theme: NewThemeRequest): Promise<IThemeSchema> {
    const dbTheme = {
        title: theme.title,
        description: theme.description,
        date: new Date(),
        votedUpIds: [],
        votedDownIds: [],
        winnerId: null


    };
    return Theme.create(dbTheme)
};

const Theme = mongoose.model<IThemeSchema, IThemeModel>('Theme', themeSchema);

export default Theme;