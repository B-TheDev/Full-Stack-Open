import React from 'react';
import { useState} from 'react'


// Button component
const Button = ({ type, onClick }) => {
  console.log(`Button (${type}) rendered`);
  return <button onClick={() => onClick(type)}>{type}</button>;
};

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  console.log('Statistics rendered');

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    console.log('No feedback rendered')
    return <p>No feedback gathered yet.</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>Good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad:</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average:</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Positive Percentage:</td>
            <td>{positivePercentage.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ButtonClickHandler component
const ButtonClickHandler = ({ onButtonClick }) => {
  console.log('ButtonClickHandler rendered');

  const handleButtonClick = (type) => {
    onButtonClick(type);
  };

  return (
    <div>
      <Button type="good" onClick={handleButtonClick} />
      <Button type="neutral" onClick={handleButtonClick} />
      <Button type="bad" onClick={handleButtonClick} />
    </div>
  );
};

// Display component
const Display = ({ good, neutral, bad, onButtonClick }) => {
  console.log('Display rendered');

  return (
    <div>
            <h1>Get Feedback</h1>
      <ButtonClickHandler onButtonClick={onButtonClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

function App() {
  console.log('App rendered');

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return <Display good={good} neutral={neutral} bad={bad} onButtonClick={handleButtonClick} />;
}

export default App;