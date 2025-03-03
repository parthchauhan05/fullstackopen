const Course = (props) => {

    const totalExercises = (parts) => {
        return parts.reduce((accumulate, current) => accumulate + current.exercises, 0)
    }

    return (
        <>
            {props.course.map(item => {
                return (
                    <div key={item.id}>
                        <h1>{item.name }</h1>
                        {item.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
                        <b> total of {totalExercises(item.parts)} exercises</b>
                    </div>
                )
            })}
        </>
    )
}

export default Course;