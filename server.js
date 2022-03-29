//importing
import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

//DB config
const connection_url = 'mongodb+srv://RajuRk:1234@rajkumar.bfgft.mongodb.net/whatsappclone?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//???

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get('/messages/sync', (req,res) => {
    
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessages = req.body;

    Messages.create(dbMessages, (err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data);
        }
    })
})

//listen
app.listen(port, () => console.log(`Listening on Localhost: ${port} `));