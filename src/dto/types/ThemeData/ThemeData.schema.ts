export const ThemeData = {
    "$schema": "http://json-schema.org/draft-07/ThemeData",
    "required": ["id", "description", "title"],
    "additionalProperties": false,
    "properties": {
        "description": {
            "type": "string"
        },
        "id": {
            "type": "string"
        },
        "title": {
            "type": "string"
        }
    },
    "type": "object"
};

