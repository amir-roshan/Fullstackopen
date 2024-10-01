import express from "express";
import { persons } from "./data.js";

const PORT = 3001;
const app = express();

// app.use(express.json());

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    }
    else {
        res.status(404).send(`<h2>Person with the ID of ${id} is not found :(</h2>`);
    }
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