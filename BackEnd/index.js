import  express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDb from "./Database/dbconnect.js";
import Playerrouter from "./Routers/GameRouters.js";

dotenv.config()

const port=process.env.PORT

const app = express();


ConnectDb()
app.use(cors())
app.use(express.json())
app.use('/api',Playerrouter)

app.listen(port, () => {
    console.log('my app listen in',port)
})