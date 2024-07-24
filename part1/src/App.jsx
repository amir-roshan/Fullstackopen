const Part = (props) => {
    const data = props.data;
    return <>
        <p>{data.name} {data.exercises}</p>
    </>;
};

const Total = (props) => {
    const parts = props.parts;

    let exercises = 0;
    parts.map((data) => exercises += data.exercises);

    return <>
        <p>Number of exercises {exercises}</p>
    </>;
};

const Content = (props) => {
    const info = props.parts;
    return <>
        <Part data={info[0]} />
        <Part data={info[1]} />
        <Part data={info[2]} />
    </>;
};

const Header = (props) => {
    const course = props.course.name;
    return <>
        <h1>{course}</h1>
    </>;
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    const parts = course.parts;

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default App;