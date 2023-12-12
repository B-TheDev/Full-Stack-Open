const Course = ({ course }) => {
    const Header = () => {
      console.log(course.name);
      return (
        <div>
          <h1>{course.name}</h1>
        </div>
      );
    };
  
    const Content = () => {
      console.log('Content works');
  
      return (
        <div>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name}: {part.exercises}
            </p>
          ))}
        </div>
      );
    };
  
    const Total = () => {
      console.log('Total has been calculated');
  
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

  export default Course

