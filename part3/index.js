import express from "express";
import { persons } from "./data.js";

const PORT = 3001;
const app = express();

// app.use(express.json());

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.listen(PORT);