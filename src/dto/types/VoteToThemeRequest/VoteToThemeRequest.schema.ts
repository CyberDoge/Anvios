export const VoteToThemeRequest = {
    "$schema": "http://json-schema.org/draft-07/VoteToThemeRequest",
    "required": ["agree", "themeId"],
    "additionalProperties": false,
    "properties": {
        "agree": {
            "type": "boolean"
        },
        "themeId": {
            "type": "string"
        }
    },
    "type": "object"
};

