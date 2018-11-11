import React from 'react'

const Person = ({person, deleteHandler}) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={deleteHandler}>Poista</button></td>
    </tr>
)
export default Person
