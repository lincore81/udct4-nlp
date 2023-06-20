import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';

import { request } from "./api/sentiment";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('dist'));
app.use('/styles', express.static('src/client/styles'));

app.post('/api', async (req, res) => {
    const json = req.body;
    if (json?.url) {
        const response = await request(json.url);
        console.log("Response: ", response);
        res.send(response);
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`Server listening on ${port}.`);
});
