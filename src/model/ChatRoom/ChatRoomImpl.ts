import SessionModel from "../../session/SessionModel";
import WebSocket from "ws";
import PrimaryResponse from "../../dto/PrimaryResponse";

class ChatRoomImpl {
    private downUser: SessionModel;
    private upUser: SessionModel;
    private spectators: Array<SessionModel>;
    private currentTurn: "up" | "down" = Math.random() >= 0.5 ? "up" : "down";
    private currentUser: SessionModel = this.upUser;
    private waitingUser: SessionModel = this.downUser;
    private messageIndex: number = 0;

    constructor(downUser: SessionModel, upUser: SessionModel) {
        this.downUser = downUser;
        this.upUser = upUser;
        this.spectators = [];
        this.upUser.setupNewMessageHandler(this.userMessageHandler(this.upUser))
        this.downUser.setupNewMessageHandler(this.userMessageHandler(this.upUser))
    }

    startChat = (): void => {

    }

    receiveMessageFromCurrentUser = (user: SessionModel, message: string): void => {
        if (user === this.currentUser) {
            const receivedMessage = new PrimaryResponse(message, `message#${this.messageIndex}`);
            this.waitingUser.sendMessage(receivedMessage);
            this.spectators.forEach(spec => spec.sendMessage(receivedMessage))
        }
    }

    private userMessageHandler = (user: SessionModel) => (message: WebSocket.Data): void => {
        if (typeof message === "string") {
            this.receiveMessageFromCurrentUser(user, message)
        }
    }
}
