import { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const getAllFeedbacks = () => good + neutral + bad;
    const getAverage = () => ((good + (bad * -1)) / (good + neutral + bad));
    const getPositivePercentage = () => (good / (good + neutral + bad)) * 100;

    return <>
        <h1>Give Feedback</h1>
        <button onClick={() => { setGood(good + 1); }}>Good</button>
        <button onClick={() => { setNeutral(neutral + 1); }}>Nuetral</button>
        <button onClick={() => { setBad(bad + 1); }}>Bad</button>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {getAllFeedbacks()}</p>
        <p>Average: {getAverage()}</p>
        <p>Positive: {isNaN(getPositivePercentage()) ? 0 : getPositivePercentage()} %</p>
    </>;
};

export default App;
