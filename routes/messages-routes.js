import  express  from "express";
import { messageController } from "../controllers/messages-controller.js";
export const messageRoutes=express.Router();
messageRoutes.post('/addMessage',messageController.addMessage);
messageRoutes.post('/getMessage',messageController.getAllMessage);
