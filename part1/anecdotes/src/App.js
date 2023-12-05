import { useState } from 'react'




function App() {
  console.log('App is running')
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    console.log('Next anecdote handled')
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    console.log('voting has been handled')
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const getMaxVotesIndex = () => {
    console.log('maximum vote handled')
    let maxVotesIndex = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[maxVotesIndex]) {
        maxVotesIndex = i;
      }
    }
    return maxVotesIndex;
  };

  const maxVotesIndex = getMaxVotesIndex();

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next Anecdote</button>

      <h2>Most Voted Anecdote</h2>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>Votes: {votes[maxVotesIndex]}</p>
    </div>
  );
}

export default App;
