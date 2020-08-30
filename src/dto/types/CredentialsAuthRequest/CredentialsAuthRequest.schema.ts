export const CredentialsAuthRequest = {
    "$schema": "http://json-schema.org/draft-07/schema#",
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
