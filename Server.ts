import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import dbconnect from './db/connect';
import UserRouter from './routes/user.route';
dotenv.config();

const PORT: number = Number(process.env.PORT ?? 5000);
const uri: any = process.env.MONGO_DB;
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------ connecting to MONGODB database -----------
mongoose.set('strictQuery', true);
dbconnect(uri);

// --------- Home/default route --------
app.get('/', (req, res) => {
  res.send('Welcome to the youtube clone api 👏');
});

// ============= API Routes ==============

// app.use("/api/auth", authRoutes);
app.use('/api/users', UserRouter);
// app.use("/api/videos", videoRoutes);
// app.use("/api/comments", commentRoutes);

// ------- listening at port number -------------
app.listen(PORT, () => {
      console.log(`the app is listening at port no: ${PORT}`)
})