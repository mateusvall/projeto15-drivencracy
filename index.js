import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pollRouter from "./routes/poll.router.js";
import choiceRouter from "./routes/choice.router.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(pollRouter);
app.use(choiceRouter);

app.get('/status', (req, res) =>{
    res.sendStatus(200);


})

app.listen(5000, () => console.log("Magic is happening at port 5000"));