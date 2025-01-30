import express from "express";
import { persons } from "./data.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

app.use(express.static("dist"));
app.use(express.json());
app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      console.log(person);

      if (person) {
        res.json(person);
      } else {
        res
          .status(404)
          .send(`<h2>Person with the ID of ${id} is not found :(</h2>`);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// 3.15: phone book and database, step3
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) => {
      res.send({
        message: "Person deleted successfully",
        person: deletedPerson,
      });
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/persons", (req, res, next) => {
  const newPerson = { ...req.body };

  console.log(req.body);

  let sameName = false;

  Person.find({ name: newPerson.name }).then(() => {
    sameName = true;
  });

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
  } else {
    const person = new Person({
      name: newPerson.name,
      phoneNumber: newPerson.phoneNumber,
    });

    person
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
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

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// Centralize Error Handling
// 3.16: phone book and database, step4
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
