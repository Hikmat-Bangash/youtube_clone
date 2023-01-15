import express, {Express} from 'express'
import UserRouter from './user.route';

const app: Express = express();

export const MainRoutes = (): void => {
    console.log("index file of user route")
    // app.use("/api/auth", authRoutes);
    app.use('/api/users', UserRouter);
    // app.use("/api/videos", videoRoutes);
    // app.use("/api/comments", commentRoutes);
}