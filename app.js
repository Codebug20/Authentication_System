import express from "express";
import userRouter from "./routes/user.routes.js";
import cors from 'cors';
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use(errorMiddleware);

export { app };
