const Persons = ({ isFiltered, persons, newName, handleDelete }) => {
    return <>
        {!isFiltered && persons.map((person) => <p key={person.id}>{person.name} {person.phoneNumber} <button onClick={() => handleDelete(person.name, person.id)}>Delete</button></p>)}
        {isFiltered && persons
            .filter(person => person.name.toLowerCase().startsWith(newName.toLowerCase()))
            .map(person => <p key={person.name}>{person.name} {person.phoneNumber} <button onClick={() => handleDelete(person.name, person.id)}>Delete</button></p>)}
    </>;
};

export default Persons;