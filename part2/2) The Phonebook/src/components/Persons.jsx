const Persons = ({ isFiltered, persons, newName }) => {
    return <>
        {!isFiltered && persons.map((person) => <p key={person.name}>{person.name} {person.phoneNumber}</p>)}
        {isFiltered && persons
            .filter(person => person.name.toLowerCase().startsWith(newName.toLowerCase()))
            .map(person => <p key={person.name}>{person.name} {person.phoneNumber}</p>)}
    </>;
};

export default Persons;