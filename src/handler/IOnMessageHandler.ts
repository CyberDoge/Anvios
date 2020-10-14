import WebSocket from "ws";

// todo убрать в другое место, и RequestHandler тоже вынести в функцию или сделать более локальным (вернуть как было)
interface IOnMessageHandler {
    dataType: WebSocket.Data;
    handler: (data: WebSocket.Data) => void;
}

export default IOnMessageHandler;