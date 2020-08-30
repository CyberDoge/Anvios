// normal url parsing
import {CredentialsAuthRequestSchema} from "../dto/types/CredentialsAuthRequest";
import {TokenAuthRequestSchema} from "../dto/types/TokenAuthRequest";
import {SomeThemesRequestSchema} from "../dto/types/SomeThemeRequest";
import {ThemeDataSchema} from "../dto/types/ThemeData";
import {VoteToThemeRequestSchema} from "../dto/types/VoteToThemeRequest";
import {VoidRequestSchema} from "../dto/types/VoidRequest";

export const CREDENTIAL_AUTH = "credential_auth";
export const TOKEN_AUTH = "token_auth";
export const REG_ANON = "reg_anonymous";
export const REG_ACCOUNT = "reg_account";
export const USER = "user";
export const GET_SOME_THEMES = "get_themes";
export const CREATE_THEME = "create_theme";
export const VOTE_TO_THEME = "vote_to_theme";

export const ROUTE_REQUEST_VALIDATION_TYPE_MAP = new Map<string, object>([
    [CREDENTIAL_AUTH, CredentialsAuthRequestSchema],
    [TOKEN_AUTH, TokenAuthRequestSchema],
    [REG_ANON, VoidRequestSchema], // todo check this!
    [REG_ACCOUNT, TokenAuthRequestSchema],
    [USER, VoidRequestSchema],
    [GET_SOME_THEMES, SomeThemesRequestSchema],
    [CREATE_THEME, ThemeDataSchema],
    [VOTE_TO_THEME, VoteToThemeRequestSchema]
]);