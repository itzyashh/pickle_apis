import './src/config/db.js';
import mongoose from 'mongoose';
import express from 'express';
const app = express();
const port = 3000;

import myRoutes from './src/routes/index.js';


app.use(express.json());


app.use('/', myRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);