import { useEffect, useState } from 'react';

import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm ';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [phoneNumber, setPhoneNymber] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);

    const fetchPersons = () => {
        axios.get("http://localhost:3001/persons")
            .then(response => {
                const data = response.data;
                const newPersons = data.map(person => ({ name: person.name, phoneNumber: person.number, id: person.id }));

                setPersons(persons.concat(newPersons));
            });
    };

    useEffect(() => fetchPersons, []);

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
            alert(`${newName} is already added to the framework`);
        }
        else {
            setPersons(persons.concat({ name: newName, phoneNumber: phoneNumber, id: Math.random }));
        }
    };

    const handlePhoneName = (event) => {
        const name = event.target.value;
        setNewName(name);
    };

    const handlePhoneNUmber = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNymber(phoneNumber);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Phonebook onFilter={handleFilter} />
            <h2>Add a New</h2>
            <PersonForm onSubmit={handleSubmit} onNameChange={handlePhoneName} onPhoneNumChange={handlePhoneNUmber} />
            <h2>Numbers</h2>
            <Persons isFiltered={isFiltered} persons={persons} newName={newName} />
        </div>
    );
};

export default App;