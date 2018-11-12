import React from 'react';
import Person from './components/Person'
import Filter from './components/FilterForm'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: '',
      notification: null,
      error: false
    }
  }
  
  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
        name: this.state.newName,
        number: this.state.newPhone
    }

    const person = this.state.persons.find(p => p.name === newPerson.name)

    if(person !== undefined) {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .update(person.id, newPerson)
          .then(changedPerson => {
            const persons = this.state.persons.filter(p => p.name !== newPerson.name)
            this.setState({
              persons: persons.concat(changedPerson),
              notification: `Henkilöä ${changedPerson.name} muokattu`
            })
            this.resetNoticationState()
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newPhone: '',
            notification: `Henkilö ${newPerson.name} lisätty`
          })
          this.resetNoticationState()
        })
    }
  }

  resetNoticationState = () => {
    setTimeout(() => {
      this.setState({
        notification: null,
        error: false
      })
    }, 5000)
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

  handlePersonRemoval = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)

      if (window.confirm(`Poistetaanko ${person.name}?`)) {
        personService
          .remove(id)
          .then(() => {
            const persons = this.state.persons.filter(p => p.id !== id)
            this.setState({
              persons,
              notification: `Henkilö ${person.name} poistettu`
            })
          })
          .catch(error => {
            this.setState({
              persons: this.state.persons.filter(p => p.name !== person.name),
              notification: `Henkilöä ${person.name} ei ole`,
              error: true
            })
          })
          this.resetNoticationState()          
      }
    }  
  }

  render() {
    const applyFilter = this.state.filter.length === 0 ?
                          this.state.persons :
                          this.state.persons.filter(person => 
                            person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} error={this.state.error} />
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
            {applyFilter.map(person => 
              <Person 
                key={person.name} 
                person={person} 
                deleteHandler={this.handlePersonRemoval(person.id)} 
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
