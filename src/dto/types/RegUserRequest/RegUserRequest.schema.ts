export const RegUserRequest = {
    "$id": "http://json-schema.org/draft-07/RegUserRequest",
    "additionalProperties": false,
    "required": ["login", "password", "token"],
    "properties": {
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
