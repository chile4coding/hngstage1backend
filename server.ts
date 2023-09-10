import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser  from "body-parser"
dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "*" }));



app.listen((process.env.PORT), ()=>{
    console.log(`listening on ${process.env.PORT}`)
})