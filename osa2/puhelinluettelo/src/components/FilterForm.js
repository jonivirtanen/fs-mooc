import React from 'react'

const Filter = ({searchHandle}) => {
    return (
        <div>
            Rajaa näytettäviä: <input onChange={searchHandle}></input>
        </div>
    )
}

export default Filter

