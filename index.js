import express from 'express';
import axios from 'axios';
import crypto from 'crypto';


const app = express();
const port = 3000;

const API_KEY = "7PyxQOTTkNuSk4hQAROTy7L4QvgNle5ylacptKlpW8u8H3b4YFn7oXxymaZzk32x";
// const API_SECRET = "KCo3vTCsBYjIQbRhXXY7zVYMixY9esWVLpSUHNBYvzr31VfdOoYc9Q6toCFnothR";
const BASE_URL = "https://testnet.binance.vision/api";


app.get('/', (req, res) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})