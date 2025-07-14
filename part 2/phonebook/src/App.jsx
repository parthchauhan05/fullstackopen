import { useState } from 'react'
import Filters from './components/Filters'
import Persons from './components/Persons'
import { useEffect } from 'react'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterProp, setFilterProp] = useState('')
  const [data, setData] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [showError, setShowError] = useState(false);


  const deletePerson = (person) => {
    personService.deletePerson(person.id).then((res) => {
      getAllPersons()
      setShowError(true)
      setNotificationMessage(`Deleted ${person.name}.`)
      setTimeout(() => {
        setNotificationMessage(null)
        setShowError(false)
      }, 3000);
    }).catch(res => {
      if (res.status === 404) {
        setShowError(true)
        setNotificationMessage(`Information of ${person.name} has already been removed from server.`)
        setTimeout(() => {
        setNotificationMessage(null)
          setShowError(false)
        }, 3000);
        return
      }
    })
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
        personService.update(persons[duplicate].id, { name: newName, number: newNumber, id: persons[duplicate].id }).then(() => {
          getAllPersons()
          setShowError(false)
          setNotificationMessage(`Updated ${newName}.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000);
        }).catch(res => {
          if (res.status === 404) {
            setShowError(true)
            setNotificationMessage(`Information of ${newName} has been removed from server.`)
            setTimeout(() => {
            setNotificationMessage(null)
              setShowError(false)
            }, 3000);
            return
          }
        })
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService.create({ name: newName, number: newNumber, id: (persons.length + 1).toString() }).then(() => {
        getAllPersons()
        setShowError(false)
        setNotificationMessage(`Added ${newName}.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000);
      })
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={showError} />
      <Filters filterProp={filterProp} setFilterProp={setFilterProp}/>
      
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Persons data={data} deletePerson={deletePerson} />
    </div>
  )
}

  export default App;