export const RegUserRequest = {
    "$schema": "http://json-schema.org/draft-07/RegUserRequest",
    "properties": {
        "required": ["login", "password", "token"],
        "additionalProperties": false,
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "token": {
            "type": "string"
        }
    },
    "type": "object"
};
