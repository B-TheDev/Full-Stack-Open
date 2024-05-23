import React, { useState, useEffect } from 'react';
import axios  from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    /*{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }*/
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    setShowAlert(false); 
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    

    if (isDuplicate) {
      setShowAlert(true);
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
      axios
    .post('http://localhost:3001/persons', newPerson)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
    })
    setNewName('');
      setNewNumber('');
    }
   
  };

  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );



  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <h3>Add a new contact</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showAlert && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Contact already exists! Please choose a different name.
        </div>
      )}
    </div>
  );
};

export default App;
