const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

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