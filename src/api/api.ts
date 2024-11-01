import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/db';
import router from './routes/router';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export function startApiService() {
    const app = express();

    const corsOptions = {
        origin: process.env.CORS_ORIGIN,
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // Log all requests

    // Routes
    app.use('/', router);

    // Connect to MongoDB
    connectDB();

    const port = process.env.PORT || 5005;

    app.listen(port, () => console.log(`Server started on port ${port}`));
}
