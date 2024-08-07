import { useEffect, useState } from 'react';

import Message from './components/Message';
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm ';
import Persons from './components/Persons';

import phoneNumberService from './services/phoneNumbers';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);
    const [message, setMessage] = useState('');
    const [style, setStyle] = useState({});

    const styles = [
        {
            name: "delete", style: {
                color: 'red',
                backgroundColor: "lightred",
                fontSize: "24px",
                padding: "15px",
                border: "medium solid red"
            }
        }, {
            name: "name", style: {
                color: 'green',
                backgroundColor: "lightgrey",
                fontSize: "24px",
                padding: "15px",
                border: "medium solid green"
            }
        }, {
            name: "number", style: {
                color: 'blue',
                backgroundColor: "lightgrey",
                fontSize: "24px",
                padding: "15px",
                border: "medium solid green"
            }
        }
    ];

    const fetchPersons = () => {
        const fetchedPersons = phoneNumberService.getAll();
        fetchedPersons.then(initialPhoneNums => {

            const unFilteredPersons = initialPhoneNums.concat(persons);

            const filteredPersons = [];
            unFilteredPersons.forEach(person => {
                if (!filteredPersons.includes(person)) {
                    filteredPersons.push(person);
                }
            }
            );

            setPersons(prevPersons => prevPersons.concat(initialPhoneNums));
        });
    };

    const addPerson = (newPerson) => {
        const addedPerson = phoneNumberService.add(newPerson);
        addedPerson.then(response => setPersons(prevPersons => prevPersons.concat(response)));
        setNewName('');
    };

    const reomvePerson = (id, name) => {
        phoneNumberService.remove(id).catch(err => {
            handleMessage(`Information of ${name} has already been removed from the server.`, "delete");
            console.error(err);
        });
    };

    const handleMessage = (message, event) => {
        const messageStyle = styles.find(style => style.name === event);
        setStyle(messageStyle.style);

        if (event === "number") {
            setMessage(message);
        }
        else if (event === "name") {
            setMessage(message);
        }
        else if (event === "delete") {
            setMessage(message);
        }

        setTimeout(() => {
            setMessage(``);
        }, 5000);
    };

    const handleFilter = (event) => {
        setIsFiltered(true);
        const name = event.target.value;
        if (name === "")
            setIsFiltered(false);
        else
            setNewName(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let isNameSimilar = false;

        persons.forEach(item => {
            isNameSimilar = item.name === newName;
        });

        if (isNameSimilar) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                let similarPerson = persons.filter(person => person.name === newName);

                similarPerson = { ...similarPerson[0], phoneNumber: phoneNumber };

                phoneNumberService.update(similarPerson)
                    .then(response => setPersons(persons.map(person => person.id !== similarPerson.id ? person : response.data)));

                handleMessage(`${newName}'s phone number has been updated.`, "number");
            } else return;
        }
        else {
            const newPerson = { name: newName, phoneNumber: phoneNumber };
            addPerson(newPerson);
            handleMessage(`Added ${newPerson.name}`, "name");
        }
    };

    const handlePhoneName = (event) => {
        const name = event.target.value;
        setNewName(name);
    };

    const handlePhoneNUmber = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
    };

    const handleDelete = (name, id) => {
        if (window.confirm(`Delete ${name}?`)) {
            const deletedPerson = persons.find(person => person.id === id);

            reomvePerson(id, deletedPerson.name);
            setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
            handleMessage(`Deleted ${deletedPerson.name}`, "delete");
        }
        else return;
    };

    useEffect(() => fetchPersons(), []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Message onMessage={message} onChangeStyle={style} />
            <Phonebook onFilter={handleFilter} />
            <h2>Add a New</h2>
            <PersonForm onSubmit={handleSubmit} onNameChange={handlePhoneName} onPhoneNumChange={handlePhoneNUmber} />
            <h2>Numbers</h2>
            <Persons isFiltered={isFiltered} persons={persons} newName={newName} handleDelete={handleDelete} />
        </div>
    );
};

export default App;