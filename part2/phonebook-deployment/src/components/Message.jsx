const Message = ({ onMessage, onChangeStyle }) => {
    return <>
        {onMessage && <h3 style={onChangeStyle}>{onMessage}</h3>}
    </>;
};

export default Message;