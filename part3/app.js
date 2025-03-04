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
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?:\d{8}|\d{2,3}-\d{5,})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
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

// 3.18*: phone book and database, step6
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

app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name) {
      return res.status(400).send("<h2>Person does not have any name!</h2>");
    }
    if (!phoneNumber) {
      return res
        .status(400)
        .send("<h2>Person does not have any phone numbers!</h2>");
    }

    const existingPerson = await Person.findOne({ name });
    if (existingPerson) {
      return res
        .status(400)
        .send("<h2>A person with the same name is added!</h2>");
    }

    const person = new Person({ name, phoneNumber });
    await person
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

// 3.17*: Phonebook database, step5
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const updatedPerson = req.body;

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      next(err);
    });
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
  if (err.name === "ValidationError") {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  } else {
    res.status(500).send("Something went wrong!");
  }
};

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
