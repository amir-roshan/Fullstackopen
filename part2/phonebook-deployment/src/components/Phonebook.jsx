const Phonebook = ({ onFilter }) => {
    return <>
        <form action="">
            <div>filter shown with <input type="text" onChange={onFilter} /></div>
        </form>
    </>;
};

export default Phonebook;