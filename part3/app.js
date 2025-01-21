import express from "express";
import { persons } from "./data.js";
import { generateUniqueId } from "./utility.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const PORT = process.env.PORT || 3000;
const app = express();

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

app.use(
  helmet({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: [
        "'self'",
        "https://part3-little-lake-2511.fly.dev",
        "https://fonts.gstatic.com",
      ],
    },
  })
);
app.use(express.static("dist"));
app.use(express.json());
app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res
      .status(404)
      .send(`<h2>Person with the ID of ${id} is not found :(</h2>`);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const person = persons.find(
    (person) => parseInt(person.id) === parseInt(req.params.id)
  );

  console.log(person);

  if (!person) {
    return res.status(404).send("<h2>Person is not found :(</h2>");
  }

  persons.splice(person.id - 1, 1);

  res.send(person);
});

app.post("/api/persons", (req, res) => {
  const uniqueId = generateUniqueId();
  const newPerson = { id: uniqueId, ...req.body };

  console.log(req.body);

  const sameName = persons.find((person) => newPerson.name === person.name);

  if (newPerson.name === undefined || newPerson.name === "") {
    return res.status(400).send("<h2>Person does not have any name!</h2>");
  } else if (
    newPerson.phoneNumber === undefined ||
    newPerson.phoneNumber === ""
  ) {
    return res
      .status(400)
      .send("<h2>Person does not have any phone numbers!</h2>");
  } else if (sameName) {
    return res
      .status(400)
      .send("<h2>A person with the same name is added!</h2>");
  }

  persons.push(newPerson);
  res.send(newPerson);
});

app.get("/info", (req, res) => {
  let phoneBookLength = persons.length;

  let today = new Date();

  res.send(`
        <h2>Phonebook has info for ${phoneBookLength} people</h2>
        <p>${today}</p>
        `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
