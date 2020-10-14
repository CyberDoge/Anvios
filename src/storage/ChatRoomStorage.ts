import ChatRoomImpl from "../model/ChatRoom/ChatRoomImpl";

class ChatRoomStorage {
    private chatRooms: Array<ChatRoomImpl>;

    constructor() {
        this.chatRooms = new Array<ChatRoomImpl>();
    }

    public addChat(chatRoom: ChatRoomImpl): void {
        this.chatRooms.push(chatRoom);
    }
}

export default ChatRoomStorage;