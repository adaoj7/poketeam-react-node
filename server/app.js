import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

const app = express();
const PORT = 4242;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

ViteExpress.listen(app, PORT, () =>
    console.log(`what is the answer? http://localhost:${PORT}`)
);
