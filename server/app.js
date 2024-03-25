import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import axios from "axios";

const app = express();
const PORT = 4242;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.get(`/api/getPokemon`, async (req, res) => {
    console.log(req.query.name.toLowerCase());
    const lowerCaseName = req.query.name.toLowerCase();
    // console.log(res);
    try {
        const data = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${lowerCaseName}`
        );
        console.log(data.data);
        res.status(200).send(data.data);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

ViteExpress.listen(app, PORT, () =>
    console.log(`what is the answer? http://localhost:${PORT}`)
);
