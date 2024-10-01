import express from "express";
import { persons } from "./data.js";

const PORT = 3001;
const app = express();

// app.use(express.json());

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    let phoneBookLength = persons.length;

    let today = new Date();

    res.send(`
        <h2>Phonebook has info for ${phoneBookLength} people</h2>
        <p>${today}</p>
        `);
});

app.listen(PORT);