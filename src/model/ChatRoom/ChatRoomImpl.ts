import SessionModel from "../../session/SessionModel";
import WebSocket from "ws";
import PrimaryResponse from "../../dto/PrimaryResponse";
import ChatEvent from "./ChatEvent";
import ChatMessage, {IChatMessage} from "./ChatMessage";
import {JsonValidatorFilter} from "../../filter";
import PrimaryRequest from "../../dto/PrimaryRequest";
import {handleAndSendError} from "../../controller/ErrorController";
import {IUserSchema} from "../User";

const filter: JsonValidatorFilter = new JsonValidatorFilter();

class ChatRoomImpl {
    private readonly downUser: SessionModel;
    private readonly upUser: SessionModel;
    private spectators: Array<SessionModel>;
    private currentUser: SessionModel = this.upUser;
    private waitingUser: SessionModel = this.downUser;
    private messageIndex: number = 0;
    private roundNumber: number = 0;
    private timer: NodeJS.Timeout;

    constructor(downUser: SessionModel, upUser: SessionModel) {
        this.downUser = downUser;
        this.upUser = upUser;
        this.spectators = [];
        this.currentUser = Math.random() >= 0.5 ? this.upUser : this.downUser;
        this.waitingUser = this.currentUser === this.upUser ? this.downUser : this.upUser;
        this.upUser.setupNewMessageHandler(this.userMessageHandler(this.upUser))
        this.downUser.setupNewMessageHandler(this.userMessageHandler(this.upUser))
        this.timer = setTimeout(() => {
        }, 0);
    }

    startChat = () => {
        this.startNextRound();
    }

    private userMessageHandler = (user: SessionModel) => async (message: WebSocket.Data): Promise<void> => {
        if (typeof message === "string") {
            const chatMessage: PrimaryRequest<IChatMessage> = JSON.parse(message);
            try {
                await filter.doFilter(chatMessage);
            } catch (e) {
                handleAndSendError(e, chatMessage.requestId, user);
            }
            this.receiveMessageFromCurrentUser(user, chatMessage.data);
        }
    }
    private receiveMessageFromCurrentUser = (user: SessionModel, chatMessage: IChatMessage): void => {
        if (user === this.currentUser && typeof chatMessage.data === "string") {
            this.sendBroadCastMessage(chatMessage.data)
        }
    }
    private sendBroadCastMessage = (message: string): void => {
        this.spectators.forEach(user => {
            this.sendMessage(ChatEvent.CURRENT_USER_SEND_MESSAGE, user, this.currentUser.userId, message)
        });
        this.sendMessage(ChatEvent.CURRENT_USER_SEND_MESSAGE, this.waitingUser, this.currentUser.userId, message);
        this.sendMessage(ChatEvent.NOTIFY_CURRENT_USER_MESSAGE_DELIVERED, this.currentUser, this.currentUser.userId, "received");
        this.startNextRound();
    }
    private sendMessage = (event: ChatEvent, toUser: SessionModel, fromUser: IUserSchema["_id"], message: string): void => {
        toUser.sendMessage(new PrimaryResponse(new ChatMessage({
            data: message,
            event,
            toUser,
            fromUser
        }), `message#${this.messageIndex}`));
    }
    private startNextRound = (): void => {
        this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, this.currentUser, "server", "next round started");
        this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, this.waitingUser, "server", "next round started");
        this.spectators.forEach((user) =>
            this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, user, "server", "next round started")
        )
        const tmpUser = this.currentUser;
        this.currentUser = this.waitingUser;
        this.waitingUser = tmpUser;
        ++this.roundNumber;
        ++this.messageIndex;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.startNextRound, 60000)
    }
}

export default ChatRoomImpl;