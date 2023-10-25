import React from 'react';

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const Header = () => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    );
  };

  const Content = () => {
    return (
      <div>
        {course.parts.map((part, index) => (
          <p key={index}>
            {part.name}: {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  const Total = () => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
      <div>
        <p>Number of exercises: {total}</p>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;