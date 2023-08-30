import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/authRoute.js';
import UserRouter from './routes/userRoute.js';
import BlogRouter from './routes/blogRoute.js';
import databaseConnection from './database/index.js';

const app = express();

databaseConnection.getConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', AuthRouter)
app.use('/users', UserRouter)
app.use('/blogs', BlogRouter)


export default app;