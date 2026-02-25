const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");
const methodOverride = require ('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

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

app.post('/chats',(req,res)=>{
    let {f ,m, t} = req.body;
    let newChat = new Chat({
        from : f,
        to: t,
        message : m,
        created_at : new Date(),
    });
    
    newChat.save().then(()=>{
        res.redirect('/chats');
    }).catch(err => {
        console.log(err);
    });          
    
})

app.put('/chats/:id',(req,res)=>{
    let {msg : editedMessage} = req.body;
    let {id} = req.params;
    Chat.findByIdAndUpdate(id,{
        message : editedMessage,
    },{
        runValidators : true,
        new : true
    }).then(()=>{
        res.redirect('/chats');
    }).catch(err => {
        console.log(err);
    });
})

app.get('/chats/:id/edit',async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    // console.log(chatData);
    res.render("edit.ejs",{chat});
})

app.get('/chats/new',(req,res)=>{
    console.log("opened form for new chat");
    res.render("newchat.ejs");
})

app.get('/',(req,res)=>{
    console.log("root is workin");
    res.render("home.ejs");
})

app.listen(8080,()=>{
    console.log("server is listening on 8080");
})