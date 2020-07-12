import SocketServer from "./SocketServer";
import {connectToDb} from "./db/DbConfig";

connectToDb();
const socketServer = new SocketServer();
socketServer.start();