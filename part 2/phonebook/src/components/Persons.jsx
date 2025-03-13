const Persons = ({data}) => {
    return (
        <>
            { data.map(item => <div key={item.id}> {item.name} {item.number}</div>) }
        </>
    )
}

export default Persons;