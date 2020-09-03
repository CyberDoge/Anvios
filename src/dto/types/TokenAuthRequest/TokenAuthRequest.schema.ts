export const TokenAuthRequest = {
    "$id": "http://json-schema.org/draft-07/TokenAuthRequest",
    "required": ["token"],
    "additionalProperties": false,
    "properties": {
        "token": {
            "type": "string"
        }
    },
    "type": "object"
};
