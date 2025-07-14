import { useState } from 'react'
import Filters from './components/Filters'
import Persons from './components/Persons'
import { useEffect } from 'react'
import PersonForm from './components/PersonForm'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterProp, setFilterProp] = useState('')
  const [data, setData] = useState([])

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => getAllPersons())
  }

  const getAllPersons = () => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
    })
  }

  useEffect(() => {
    getAllPersons();
  }, [])

  useEffect(() => {
    const temp = filterProp ? persons.filter(item => item.name.toLowerCase().includes(filterProp.toLowerCase())) : persons;
    setData(temp)
  }, [filterProp, persons])
  
  const addPerson = (e) => {
    e.preventDefault()
    const duplicate = persons.findIndex(item => item.name == newName)
    if (duplicate !== -1) {
      if (confirm(`${newName} is already added to phonebook. Do you want to replace the old number with new one?`)) {
        personService.update(persons[duplicate].id, { name: newName, number: newNumber, id: persons[duplicate].id }).then(() => getAllPersons())
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService.create({ name: newName, number: newNumber, id: (persons.length+1).toString() }).then(() => getAllPersons())
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
      <Persons data={data} deletePerson={deletePerson} />
    </div>
  )
}

  export default App;