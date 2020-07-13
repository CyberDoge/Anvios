import SocketServer from "./SocketServer";
import {connectToDb} from "./db/DbConfig";
import dotenv from "dotenv";

dotenv.config();
connectToDb();
const socketServer = new SocketServer();
socketServer.start();