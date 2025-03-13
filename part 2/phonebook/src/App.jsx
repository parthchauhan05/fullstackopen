import { useState } from 'react'
import Filters from './components/Filters'
import Persons from './components/Persons'
import { useEffect } from 'react'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterProp, setFilterProp] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const temp = filterProp ? persons.filter(item => item.name.toLowerCase().includes(filterProp.toLowerCase())) : persons;
    setData(temp)
  }, [filterProp, persons])
  
  const addPerson = (e) => {
    e.preventDefault()
    const duplicate = persons.findIndex(item => item.name == newName)
    if (duplicate !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length+1 }])
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filters filterProp={filterProp} setFilterProp={setFilterProp}/>
      
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Persons data={data} />
    </div>
  )
}

export default App