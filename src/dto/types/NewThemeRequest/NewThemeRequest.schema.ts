export const NewThemeRequest = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "required": ["title"],
    "additionalProperties": false,
    "properties": {
        "description": {
            "type": "string"
        },
        "title": {
            "type": "string"
        }
    },
    "type": "object"
};
