import React from 'react';
import Person from './components/Person'
import Filter from './components/FilterForm'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }
  
  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        console.log(response)
        this.setState({persons: response})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
        name: this.state.newName,
        number: this.state.newPhone
    }

    if(this.state.persons.findIndex(person => person.name === personObject.name) === -1) {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newPhone: ''
          })
        })
    }
  }

  handleSearchChange = (event) => {
      this.setState({filter: event.target.value})
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
      this.setState({newPhone: event.target.value})
  }

  render() {
    const applyFilter = this.state.filter.length === 0 ?
                          this.state.persons :
                          this.state.persons.filter(person => 
                            person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter searchHandle={this.handleSearchChange} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
              nimi: <input onChange={this.handleNameChange}/>
          </div>
          <div>
              puhelinnumero: <input onChange={this.handleNumberChange} />
          </div>
          <div>
              <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {applyFilter.map(person => <Person key={person.name} person={person} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
