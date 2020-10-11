import WebSocket from "ws";

interface IOnMessageHandler {
    dataType: WebSocket.Data;
    handler: (data: WebSocket.Data) => void;
}

export default IOnMessageHandler;