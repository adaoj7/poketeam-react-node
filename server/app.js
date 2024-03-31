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

const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const randomPokemon = (num, start, end) => {
    const numArr = [];
    for (let i = 0; i < num; i++) {
        const int = getRandomArbitrary(start, end).toString();
        numArr.push(int);
    }
    return numArr;
};

app.get(`/api/getPokemon`, async (req, res) => {
    const oneRandomPokemon = randomPokemon(1, 1, 1027)[0];
    try {
        const data = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${oneRandomPokemon}`
        );
        // console.log(data.data);
        res.status(200).send(data.data);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.get("/api/getTeamGenOne", async (req, res) => {
    const teamArr = randomPokemon(6, 1, 152);
    try {
        const responses = await Promise.all(
            teamArr.map((id) =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            )
        );
        const data = responses.map((response) => response.data);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
app.get("/api/getTeamGenTwo", async (req, res) => {
    const teamArr = randomPokemon(6, 1, 252);
    try {
        const responses = await Promise.all(
            teamArr.map((id) =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            )
        );
        const data = responses.map((response) => response.data);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
app.get("/api/getTeamGenThree", async (req, res) => {
    const teamArr = randomPokemon(6, 252, 387);
    try {
        const responses = await Promise.all(
            teamArr.map((id) =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            )
        );
        const data = responses.map((response) => response.data);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

ViteExpress.listen(app, PORT, () =>
    console.log(`what is the answer? http://localhost:${PORT}`)
);
