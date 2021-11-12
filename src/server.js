import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import BlogRouter from './routes/blogRoute.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', AuthRouter)
app.use('/users', userRouter)
app.use('/blogs', BlogRouter)


export default app;