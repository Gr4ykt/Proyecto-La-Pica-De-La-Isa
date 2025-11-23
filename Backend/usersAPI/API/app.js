import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/', authRouter);
app.use('/api/', userRouter);

export default app;