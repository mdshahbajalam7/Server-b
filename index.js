import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'

// all routes there
import PostRoutes from "./routes/post.js";

const app = express();
dotenv.config()

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", PostRoutes);

app.get("/",(req,res)=>{
  
})

const PORT = process.env.PORT || 5000;

mongoose
  .connect( process.env.CONNECTION_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
        console.log("connection successfully");
      console.log(`server running on port  ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
// mongoose.set("strictQuery", false);
// mongoose.set("useFindAndModify", false);
