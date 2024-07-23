const Part = (props) => {
    return <>
        <p>{props.data.part} {props.data.exercise}</p>
    </>;
};

const Total = (props) => {
    return <>
        <p>Number of exercises {props.totalExercises}</p>
    </>;
};

const Content = (props) => {
    return <>
        <Part data={props.info[0]} />
        <Part data={props.info[1]} />
        <Part data={props.info[2]} />
    </>;
};

const Header = (props) => {
    return <>
        <h1>{props.course}</h1>
    </>;
};

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const data = [{ part: part1, exercise: exercises1 }, { part: part2, exercise: exercises2 }, { part: part3, exercise: exercises3 }];

    return (
        <div>
            <Header course={course} />
            <Content info={data} />
            <Total totalExercises={exercises1 + exercises2 + exercises3} />
        </div>
    );
};

export default App;