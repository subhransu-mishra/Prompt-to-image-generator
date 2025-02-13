import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRouter.js";


const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors({
    origin: 'https://canvas-ai-4-git-main-subhransu-sekhar-mishras-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// app.use(cors())
app.use(express.json())
await connectDB()

app.listen(PORT,()=>{
    console.log("Server running on port :" ,PORT);
})

app.use("/api/user",userRouter);
app.use("/api/image",imageRouter);
app.get("/",(req,res)=>{
    res.send("api working")
})
