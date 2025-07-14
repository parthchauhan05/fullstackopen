const Persons = ({ data, deletePerson }) => {
    const deletePersonConfirmation = (person) => {
        if (confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id)
        }
    }

    return (
        <>
            { Array.isArray(data) ? data?.map(item => <div key={item.id}> {item.name} {item.number}<button onClick={() => deletePersonConfirmation(item)}>Delete</button></div>) : '' }
        </>
    )
}

export default Persons;