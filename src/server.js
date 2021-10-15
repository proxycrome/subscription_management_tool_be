import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/authRoute.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', AuthRouter)


export default app;