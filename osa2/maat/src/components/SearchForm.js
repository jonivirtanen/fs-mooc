import React from 'react'

const SearchForm = ({onChange}) => {
    return (
        <div>
            Find countries: <input onChange={onChange}></input>
        </div>
    )
}

export default SearchForm