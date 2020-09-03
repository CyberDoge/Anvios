export const CredentialsAuthRequest = {
    "$id": "http://json-schema.org/draft-07/CredentialsAuthRequest",
    "additionalProperties": false,
    "required": ["login", "password"],
    "properties": {
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        }
    },
    "type": "object"
};
