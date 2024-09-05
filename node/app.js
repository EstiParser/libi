import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/productsRouter.js';
import { usersRouter } from './routes/usersRouter.js';
import { authRouter } from './routes/authRouter.js';
import bodyparser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/auth',authRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);

app.listen(5000, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 5000);
});