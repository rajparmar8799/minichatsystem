const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

main().catch(err => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("Connected to db succesfuly");
}


//index route
app.get('/chats',async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})

app.get('/',(req,res)=>{
    console.log("root is workin");
    res.send("Server Working");
})

app.listen(8080,()=>{
    console.log("server is listening on 8080");
})