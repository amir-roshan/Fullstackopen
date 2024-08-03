import { useEffect, useState } from 'react';

import axios from 'axios';

import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm ';
import Persons from './components/Persons';

import phoneNumberService from './services/phoneNumbers';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);

    const fetchPersons = () => {
        const persons = phoneNumberService.getAll();
        persons.then(initialPhoneNums => {
            setPersons(prevPersons => prevPersons.concat(initialPhoneNums));
        });
    };

    const addPerson = (newPerson) => {
        const addedPerson = phoneNumberService.add(newPerson);
        addedPerson.then(response => setPersons(persons.concat(response)));
        setNewName('');
    };

    useEffect(() => fetchPersons(), []);

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
            const newPerson = { name: newName, phoneNumber: phoneNumber };
            addPerson(newPerson);
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