import {IChatRoom} from "../model/ChatRoom";

class ChatRoomStorage {
    private chatRooms: Array<IChatRoom>;

    constructor() {
        this.chatRooms = new Array<IChatRoom>();
    }

    public addChat(chatRoom: IChatRoom): void {
        this.chatRooms.push(chatRoom);
    }
}

export default ChatRoomStorage;