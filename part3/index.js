const express  = require('express')
const app     = express()
const morganBody = require('morgan-body')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
  })
  
  app.get('/info', (request, response) => {
    const currentTime = new Date();
    const phonebookEntries = persons.length;
  
    response.send(`Phonebook has info for ${phonebookEntries} people.<br> ${currentTime}`);
  });

  app.get('/api/persons', (request, response) => {
    response.json(persons);
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    
    if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id!== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
     ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    const existingPerson = persons.find(person => person.name === body.name)

    if (existingPerson) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    const id = generateId()
    const person = {
      name: body.name,
      number: body.number,
      id: id,
    }

    persons = persons.concat(person)

    response.json(person)
  })

  app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})