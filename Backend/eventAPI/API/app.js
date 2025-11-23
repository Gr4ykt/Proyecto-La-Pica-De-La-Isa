import express from 'express';
import morgan from 'morgan'; 
import cookieParser from 'cookie-parser';


import event from './routes/event.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
//app.use("auth", event);

app.use('/api', event);
export default app;