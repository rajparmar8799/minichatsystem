const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connected to db succesfuly")
}


let allChats = [
    {
        from: "joy",
        to: "priyanshu",
        message: "Send me your books",
        created_at: new Date()
    },
    {
        from: "priyanshu",
        to: "joy",
        message: "Which subject?",
        created_at: new Date()
    },
    {
        from: "joy",
        to: "priyanshu",
        message: "DBMS and OS",
        created_at: new Date()
    },
    {
        from: "rahul",
        to: "joy",
        message: "Are you coming to college tomorrow?",
        created_at: new Date()
    },
    {
        from: "priyanshu",
        to: "rahul",
        message: "Assignment submission today bro",
        created_at: new Date()
    },
    {
        from: "anita",
        to: "joy",
        message: "Check your email once",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);