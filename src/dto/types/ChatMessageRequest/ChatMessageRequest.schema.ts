export const ChatMessageRequest = {
    "$id": "http://json-schema.org/draft-07/ChatMessageRequest",
    "additionalProperties": false,
    "required": ["data", "toUser"],
    "properties": {
        "data": {
            "type": "string"
        },
        "toUser": {
            "type": "string"
        }
    },
    "type": "object"
};
