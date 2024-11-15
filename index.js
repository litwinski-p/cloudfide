import express from 'express';
import axios from 'axios';
import {ChartJSNodeCanvas} from "chartjs-node-canvas";
import {promises as fs} from 'fs';
import path from "path"
import exphbs from "express-handlebars"


const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("images"));


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

        const width = 400;
        const height = 400;
        const configuration = {
            type: 'line',
            data: {
                labels: [...Array(100 - 1 + 1).keys()].map(x => x + 1),
                datasets: [{
                    label: "Trades",
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        };
        const chartCallback = (ChartJS) => {
            ChartJS.defaults.responsive = true;
            ChartJS.defaults.maintainAspectRatio = false;
        };
        const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height, chartCallback});
        const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        await fs.writeFile('./images/trades.png', buffer, 'base64');


        const imageList = [];
        imageList.push({src: `trades.png`});
        console.log(prices);
        res.render("dynamic", {imageList: imageList});


    } catch (err) {
        console.error(`Error fetching trades:`, err.response ? err.response.data : err.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})