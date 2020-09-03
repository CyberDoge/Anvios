export const NewThemeRequest = {
    "$id": "http://json-schema.org/draft-07/NewThemeRequest",
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
