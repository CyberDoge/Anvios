import * as mongoose from "mongoose";
import {Document, Model, Schema} from "mongoose";
import NewThemeRequest from "../dto/NewThemeRequest";
import {IUserSchema} from "./User";
import {changeUserVoteOnTheme} from "../service/themeService/ThemeService";


export interface IThemeSchema extends Document {
    title: string;
    description?: string;
    date: Date,
    votedUpIds: Array<IUserSchema["_id"]>,
    votedDownIds: Array<IUserSchema["_id"]>,
    winnerId?: Schema.Types.ObjectId
}

interface IThemeModel extends Model<IThemeSchema> {
    getSomeSortedByDateThemes(from: number, count: number): Promise<Array<IThemeSchema>>,

    voteToTheme(themeId: string, userId: string, agree: boolean): Promise<IThemeSchema | null>,

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
    new Set<string>();
    return await this.find({}).sort("-data").skip(+from).limit(+count).exec()
};

themeSchema.statics.createTheme = async function (theme: NewThemeRequest): Promise<IThemeSchema> {
    const dbTheme = {
        title: theme.title,
        description: theme.description,
        date: new Date(),
        votedUpIds: [],
        votedDownIds: [],
    };
    return Theme.create(dbTheme)
};

themeSchema.statics.voteToTheme = async function (themeId: string, userId: string, agree: boolean): Promise<IThemeSchema | null> {
    const theme = await Theme.findById(themeId);
    if (!theme) {
        return null;
    }
    changeUserVoteOnTheme(theme, false, "");

    return theme.save();
};

const Theme = mongoose.model<IThemeSchema, IThemeModel>('Theme', themeSchema);

export default Theme;