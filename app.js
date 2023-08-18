import  express  from "express";
import { userRoutes } from "./routes/user-routes.js";
import cors from 'cors';
import { messageRoutes } from "./routes/messages-routes.js";
import  {Server}  from "socket.io";
const app=express();
app.use(express.json());
app.use(cors());
app.use('/',userRoutes);
app.use('/',messageRoutes)
// last middleware(404)
app.use((request,response,next)=>{
    response.json({message:"invalid URL"})
})
const server=app.listen(1234,(err)=>{
    if(err){
        console.log("server crash ",err);
    }
    else{
        console.log("server up and running", server.address().port)
    }
})

const io=new Server(server,{
    cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
global.OnlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);;
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.msg);
        }
    });
})