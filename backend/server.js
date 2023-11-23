import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import { errorHandler, notFound } from './middlewares/errors.js';
import { isAuthorized } from './middlewares/authorization.js';
import problemsRouter from './routers/problemsRouter.js';
import authRouter from './routers/authRouter.js';
import { nanoid } from 'nanoid';
import connectDB from './helpers/db.js';
dotenv.config();

connectDB();
const app = express();
// app.use(cors());
app.use(cors({
    //! Vite Frontend Port
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    //* use redis in prod
    // secret: nanoid(),
    secret: "abc",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use('/auth', authRouter);
app.use('/problems', isAuthorized, problemsRouter);

app.use(notFound);
app.use(errorHandler);

const port = 4000;
app.listen(port, () => {
    console.log(`[ SERVICE :: ADMIN SERVICE ] Administrator Service is listening on http://localhost:${port}`);
});