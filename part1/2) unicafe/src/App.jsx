import { useState } from "react";

const Statistics = ({ text, value }) => {
    return <>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    </>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const getAllFeedbacks = () => good + neutral + bad;
    const getAverage = () => ((good + (bad * -1)) / (good + neutral + bad));
    const getPositivePercentage = () => (good / (good + neutral + bad)) * 100; 4;

    if (!(good || neutral || bad))
        return <>
            <h1>Give Feedback</h1>
            <button onClick={() => { setGood(good + 1); }}>Good</button>
            <button onClick={() => { setNeutral(neutral + 1); }}>Nuetral</button>
            <button onClick={() => { setBad(bad + 1); }}>Bad</button>
            <h2>No Feedback Given</h2>
        </>;
    else {
        return <>
            <h1>Give Feedback</h1>
            <button onClick={() => { setGood(good + 1); }}>Good</button>
            <button onClick={() => { setNeutral(neutral + 1); }}>Nuetral</button>
            <button onClick={() => { setBad(bad + 1); }}>Bad</button>
            <h1>Statistics</h1>
            <table>
                <tbody>

                    < Statistics text={"Good"} value={good} />
                    < Statistics text={"Neutral"} value={neutral} />
                    < Statistics text={"Bad"} value={bad} />
                    < Statistics text={"All"} value={getAllFeedbacks()} />
                    < Statistics text={"Average"} value={isNaN(getAverage()) ? 0 : getAverage()} />
                    < Statistics text={"Positive"} value={isNaN(getPositivePercentage()) ? 0 : getPositivePercentage() + "%"} />
                </tbody>
            </table>
        </>;
    }
};

export default App;
