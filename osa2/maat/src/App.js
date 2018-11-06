import React from 'react';
import Country from './components/Country'
import SearchForm from './components/SearchForm'
import axios from 'axios'
import './styles.css'

const DisplayCountries = (props) => {
  const countriesToShow = props.countries.filter(country => country.name.includes(props.filter))

  if (countriesToShow.length > 1 && countriesToShow.length <= 10)
    return(
      <ul>
        {countriesToShow.map(country => <li>{country.name}</li>)}
      </ul>
    )
  else if (countriesToShow.length === 1) 
      return (
        <Country country={countriesToShow[0]} />
      )
  else
    return (
      "too many matches, specify another filter"
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '' 
    }
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({countries: response.data})
    })
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }


  render() {
    return (
      <div class="container">
        <SearchForm onChange={this.handleFilterChange} />
        <DisplayCountries countries={this.state.countries} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App