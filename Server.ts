import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbconnect from './db/connect';
import UserRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import VideoRouter from './routes/Video.route';
import Commentrouter from './routes/Comment.route';

dotenv.config();
const app: Express = express();

// environment variables
const PORT: number = Number(process.env.PORT ?? 5000);
const uri: any = process.env.MONGO_DB;

// ------ connecting to MONGODB database -----------
mongoose.set('strictQuery', true);
dbconnect(uri);

//---- home route -----
app.get('/', (req, res) => {
  res.send('Welcome to the youtube clone api 👏');
});

// ========= Middlewares =========
app.use(cors());
app.use(helmet());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use('/api/users', UserRouter);
app.use("/api/video",VideoRouter);
app.use("/api/comment",Commentrouter);

// ----- Error handler ------
app.use((err:any, req: Request, res: Response, next: any) => {
  const status: any = err.status || 500;
  const message: any = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// ------- listening at port number -------------
app.listen(PORT, () => {
  console.log(`the app is listening at port no: ${PORT}`)
})