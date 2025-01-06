import express from "express";
import { connectDB } from "./lib/connectDB.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
    connectDB();
    console.log("Listening to port 8080");
});
