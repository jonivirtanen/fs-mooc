import React from 'react'

const Country = ({country}) => {
    return (
        <div>
            <h2>
                {country.name} {country.nativeName}
            </h2>
            <p>Capital: {country.capital}</p> 
            <p>Population: {country.population}</p>
            <img src={country.flag} alt={country.name}></img>
        </div>
    )
}

export default Country