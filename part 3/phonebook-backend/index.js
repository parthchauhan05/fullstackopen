import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Person from './person.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(express.urlencoded({ extended: true }));
morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
  return String(parseInt(Math.random() * 100000000000))
}

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(result => {
      response.json(result)
    }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info for ${result.length} people.<br/>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))    
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
  Person.findByIdAndDelete(id).then(res => {
      response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    if (!person.name || !person.number) {
        return response.status(400).json({error: "Name or number is missing"})
    }
    Person.find({ name: person.name }).then(res => {
      if (res) {
          return response.json({ error: 'name must be unique' })
      }
    })
    const newPerson = Person({ name: person.name, number: person.number })
    newPerson.save().then(() => {
      response.json(person)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number 
      return person.save().then((res) => {
        response.json(res)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})