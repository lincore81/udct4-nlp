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


app.listen(port, () => {
    console.log(`Server listening on ${port}.`);
});

app.post('/api', async (req, res) => {
    const json = req.body;
    console.log("Request: ", req.body);
    if (json?.url || json?.txt) {
        try {
            const response = await request(json?.url || json?.txt, !!json.url);
            console.log("Response: ", response);
            res.send(response);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});