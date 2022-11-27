const Message = require("../model/messageModel");

module.exports.sendMessage = async (req, res, next) =>{
    try {
        const {from, to, message} = req.body;
        const data = await Message.create({
            message: {text: message},
            users: [from , to],
            sender: from
        })

        if(data){
            return res.json({msg: "Message sent successfully"})
        }
        return res.json({msg: "Fail to send message"})
    } catch (error) {
        next(error)
    }
}

module.exports.getAllMessage = async (req, res, next) =>{
    const data = await Message.find({
        
    })
}