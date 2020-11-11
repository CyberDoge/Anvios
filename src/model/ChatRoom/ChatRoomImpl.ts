import SessionModel from "../../session/SessionModel";
import WebSocket from "ws";
import PrimaryResponse from "../../dto/PrimaryResponse";
import ChatEvent from "./ChatEvent";
import ChatMessage, {IChatMessage} from "./ChatMessage";
import {JsonValidatorFilter} from "../../filter";
import PrimaryRequest from "../../dto/PrimaryRequest";
import {handleAndSendError} from "../../controller/ErrorController";
import {IUserSchema} from "../User";
import {ChatMessageRequest} from "../../dto/types/ChatMessageRequest";
import {ChatStartedResponse} from "../../dto/types/ChatStartedResponse";
import ChatRoom from "./ChatRoom";
import {IThemeSchema} from "../Theme";
import {log} from "winston";

const filter: JsonValidatorFilter = new JsonValidatorFilter();

class ChatRoomImpl {
    private readonly downUser: SessionModel;
    private readonly upUser: SessionModel;
    private readonly themeId: IThemeSchema["_id"];
    private readonly downUserMessages: Array<IChatMessage["_id"]>;
    private readonly upUserMessages: Array<IChatMessage["_id"]>;
    private spectators: Array<SessionModel>;
    private currentUser: SessionModel = this.upUser;
    private waitingUser: SessionModel = this.downUser;
    private messageIndex: number = 0;
    private roundNumber: number = 0;
    private timer: NodeJS.Timeout;

    constructor(downUser: SessionModel, upUser: SessionModel, themeId: IThemeSchema["_id"]) {
        this.downUser = downUser;
        this.upUser = upUser;
        this.themeId = themeId;
        this.downUserMessages = [];
        this.upUserMessages = [];
        this.spectators = [];
        this.currentUser = Math.random() >= 0.5 ? this.upUser : this.downUser;
        this.waitingUser = this.currentUser === this.upUser ? this.downUser : this.upUser;
        this.upUser.setupNewMessageHandler(this.userMessageHandler(this.upUser))
        this.downUser.setupNewMessageHandler(this.userMessageHandler(this.downUser))
        if (!this.upUser.userId || !this.downUser.userId) {
            throw new Error(`
            Try to start server.
            \nID is null. upUser id: ${this.upUser.userId}, downUser id: ${this.downUser.userId}
            `)
        }
        this.sendObject(ChatEvent.CHAT_STARTED, this.upUser, "server", {
            upUserId: this.upUser.userId,
            downUserId: this.downUser.userId,
            enemyId: this.downUser.userId,
            youStart: this.currentUser === this.downUser
        })
        this.sendObject(ChatEvent.CHAT_STARTED, this.downUser, "server", {
            upUserId: this.upUser.userId,
            downUserId: this.downUser.userId,
            enemyId: this.upUser.userId,
            youStart: this.currentUser === this.upUser
        })
        this.timer = setTimeout(() => {
        }, 0);
    }

    startChat = () => {
        this.startNextRound();
    }

    private userMessageHandler = (user: SessionModel) => async (message: WebSocket.Data): Promise<void> => {
        if (typeof message === "string") {
            const chatMessageReq: PrimaryRequest<ChatMessageRequest> = JSON.parse(message);
            try {
                await filter.doFilter(chatMessageReq);
            } catch (e) {
                handleAndSendError(e, chatMessageReq.requestId, user);
            }
            chatMessageReq.data.fromUser = user.userId;
            chatMessageReq.data.event = ChatEvent.CURRENT_USER_SEND_MESSAGE;
            this.receiveMessageFromCurrentUser(user, chatMessageReq.data);
        }
    }
    private endGame = (winnerId: IUserSchema["_id"]) => {
        clearTimeout(this.timer);
        const chatRoomBd = new ChatRoom({
            downUserId: this.downUser.userId,
            upUserId: this.upUser.userId,
            themeId: this.themeId,
            winnerId,
            downUserMessages: this.downUserMessages,
            upUserMessages: this.upUserMessages
        });
        chatRoomBd.save();
    }
    private receiveMessageFromCurrentUser = (user: SessionModel, chatMessage: ChatMessageRequest): void => {
        if (user === this.currentUser && typeof chatMessage.data === "string") {
            if (chatMessage.data === "loose") {
                this.endGame(this.waitingUser.userId);
                return;
            }
            this.sendBroadCastMessage(chatMessage.data)
        } else {
            this.sendMessage(ChatEvent.NOT_YOUR_TURN, user, "server", "not your turn")
        }
    }
    private sendBroadCastMessage = (message: string): void => {
        this.spectators.forEach(user => {
            this.sendMessage(ChatEvent.CURRENT_USER_SEND_MESSAGE, user, this.currentUser.userId, message)
        });
        this.sendMessage(ChatEvent.CURRENT_USER_SEND_MESSAGE, this.waitingUser, this.currentUser.userId, message);
        this.sendMessage(ChatEvent.NOTIFY_CURRENT_USER_MESSAGE_DELIVERED, this.currentUser, this.currentUser.userId, message);
        this.startNextRound();
    }
    private sendMessage = (event: ChatEvent, toUser: SessionModel, fromUser: IUserSchema["_id"], message: string): void => {
        const chatMessageBdModel = new ChatMessage({
            data: message,
            event,
            toUser: toUser.userId,
            fromUser
        });
        if(fromUser === this.upUser.userId){
            this.upUserMessages.push(chatMessageBdModel._id);
        }else {
            this.downUserMessages.push(chatMessageBdModel._id);
        }
        toUser.sendMessage(new PrimaryResponse(chatMessageBdModel, `message#${this.messageIndex}`));
        chatMessageBdModel.save();
    }
    private sendObject = (event: ChatEvent, toUser: SessionModel, fromUser: IUserSchema["_id"], object: ChatStartedResponse): void => {
        toUser.sendMessage(new PrimaryResponse(new ChatMessage({
            data: object,
            event,
            toUser,
            fromUser
        }), `message#${this.messageIndex}`));
    }
    private startNextRound = (): void => {
        this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, this.currentUser, "server", "enemy");
        this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, this.waitingUser, "server", "you");
        this.spectators.forEach((user) =>
            this.sendMessage(ChatEvent.NEXT_ROUND_STARTED, user, "server", "next round started")
        )
        const tmpUser = this.currentUser;
        this.currentUser = this.waitingUser;
        this.waitingUser = tmpUser;
        ++this.roundNumber;
        ++this.messageIndex;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.startNextRound, 120000)
    }
}

export default ChatRoomImpl;