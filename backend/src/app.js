import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config.js';
import { connectDB } from './db.js';
import authRouter from './routes/authRouter.js';
import oauthRouter from './routes/oauthRouter.js';
import productionRouter from './routes/productionRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import reportRouter from './routes/reportRouter.js';
import aiRouter from './routes/aiRouter.js';

const app = express();

app.use(cors({
  origin: [config.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/oauth', oauthRouter);
app.use('/api/production', productionRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/report', reportRouter);
app.use('/api/ai', aiRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

export default app;
