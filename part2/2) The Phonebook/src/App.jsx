import { useState } from 'react';

import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm ';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [phoneNumber, setPhoneNymber] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);

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
            setPersons(persons.concat({ name: newName, phoneNumber: phoneNumber }));
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