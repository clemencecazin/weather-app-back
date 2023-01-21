const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

const formidable = require("express-formidable");

app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
    res.json("API weather");
});

app.get("/weather", (req, res) => {
    const getWheather = async () => {
        try {
            const search = req.query.name;

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.WHEATHER_API_KEY}&units=metric`
            );

            const weather = response.data;

            res.status(200).json(weather);
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    getWheather();
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
    console.log("Server Started");
});
