const PersonForm = ({ onSubmit, onNameChange, onPhoneNumChange }) => {
    return <>
        <form onSubmit={onSubmit}>
            <div>name: <input onChange={onNameChange} /></div>
            <div>number: <input onChange={onPhoneNumChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    </>;
};

export default PersonForm; 