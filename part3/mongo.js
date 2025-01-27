import { log } from "console";
import mongoose from "mongoose";

const password = process.argv[2];
const url = `mongodb+srv://amirvalielahi:${password}@cluster0.ev36gmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

// first element: the path to the Node.js
// second element: the path to the file
// third element: the password
if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.phoneNumber}`);
      });
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error fetching persons from database:", error);
      mongoose.connection.close();
      process.exit(1);
    });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];

  const person = new Person({
    name: name,
    phoneNumber: phoneNumber,
  });

  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
    process.exit(0);
  });
} else {
  console.error(
    'Incorrect number of arguments provided. Usage: node mongo.js <password> "<name>" <phone number>'
  );
  mongoose.connection.close();
  process.exit(1);
}
