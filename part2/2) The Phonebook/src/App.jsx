import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        let isNameSimilar = false;

        persons.forEach(item => {
            isNameSimilar = item.name === newName;
        });

        if (isNameSimilar) {
            alert(`${newName} is already added to the framework`);
        } else {
            setPersons(persons.concat({ name: newName }));
        }
    };

    const handlePhoneName = (event) => {
        const name = event.target.value;
        setNewName(name);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handlePhoneName} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <p key={person.name}>{person.name}</p>)}
        </div>
    );
};

export default App;