const PersonForm = ({ onSubmit, onNameChange, onPhoneNumChange, onName, onNumber }) => {
    return <>
        <form onSubmit={onSubmit}>
            <div>name: <input onChange={onNameChange} value={`${onName}`} /></div>
            <div>number: <input onChange={onPhoneNumChange} value={`${onNumber}`} /></div>
            <div><button type="submit">add</button></div>
        </form>
    </>;
};

export default PersonForm; 