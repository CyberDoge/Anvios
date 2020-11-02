enum ChatEvent {
    CHAT_STARTED = "chat_started",
    NOT_YOUR_TURN = "not_your_turn",
    NEXT_ROUND_STARTED = "next_round_started",
    CURRENT_USER_SEND_MESSAGE = "current_user_send_message",
    NOTIFY_CURRENT_USER_MESSAGE_DELIVERED = "message_delivered"
}

export default ChatEvent;