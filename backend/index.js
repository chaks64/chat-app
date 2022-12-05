const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/message",messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log(`DB connected`);
}).catch((err) =>{
    console.log(`Error connecting DB ${err.message}`);
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
        // credentails: true,
    },
});

io.on("connection", (socket) =>{
    console.log("conncted to socket.io");

    //socket connection with FE
    socket.on('setup', (data) =>{
        console.log(data);
        socket.join(data);
        socket.emit("connected");
    })


    //socket conn when any chat is opened
    socket.on('join-chat',(room) =>{
        console.log("User chat",room);
        socket.join(room);
    })

    //socket connection when message is sent
    socket.on('new-message', (newMessage)=>{
        console.log(newMessage);
        let chat = newMessage.to;
        socket.in(chat).emit('msg-received',newMessage.message);
    })

})

// global.onlineUsers = new Map();

// io.on("connection", (socket) =>{
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) =>{
//         onlineUsers.set(userId, socket.id);
//     })

//     socket.on("send-msg", (data) =>{
//         console.log(data);
//         const sendUserSocket = onlineUsers.get(data.to);
//         if(sendUserSocket){
//             socket.to(sendUserSocket).emit("msg-receive", data.message);
//         }
//     });
// });