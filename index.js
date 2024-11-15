import express from 'express';
import axios from 'axios';


const app = express();
const port = 3000;

const API_KEY = "7PyxQOTTkNuSk4hQAROTy7L4QvgNle5ylacptKlpW8u8H3b4YFn7oXxymaZzk32x";
// const API_SECRET = "KCo3vTCsBYjIQbRhXXY7zVYMixY9esWVLpSUHNBYvzr31VfdOoYc9Q6toCFnothR";
const BASE_URL = "https://testnet.binance.vision/api";
const symbol = "BNBUSDT";

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/v3/trades`,
            {
                headers: {
                    'X-MBX-APIKEY': API_KEY
                }, params: {
                    symbol,
                    limit: 100
                }
            });

        const prices = response.data.map((item) => item.price);

        res.send(prices);

    } catch (err) {
        console.error(`Error fetching trades:`, err.response ? err.response.data : err.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})