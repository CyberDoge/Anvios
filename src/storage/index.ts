import ChatRoomStorage from "./ChatRoomStorage";
import SessionStorage from "./SessionStorage";

let chatRoomStorage: ChatRoomStorage = new ChatRoomStorage();
let sessionStorage: SessionStorage = new SessionStorage();

export {chatRoomStorage, sessionStorage};