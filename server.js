
import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import 'dotenv/config';
import chatRoutes from "./routes/chat.js"

const app = express(); 

const PORT= 8080;

app.use(express.json());

app.use(cors({
    origin: [ "http://localhost:5173",
      "https://my-chatgptfrontend.onrender.com"
      ],
    credentials: true
}));

app.use("/api", chatRoutes)

app.listen(PORT,()=>{
  console.log(`The app is running at http://localhost:${PORT}`)
  connectDB();
})

const connectDB = async()=>{
  try{
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Connect with Database!")
  }
  catch(err){
    console.log("Failed to connect with Db", err)
  }
}

app.get("/test",async (req,res)=>{
  res.json({message:"Hello from the test!"})
});