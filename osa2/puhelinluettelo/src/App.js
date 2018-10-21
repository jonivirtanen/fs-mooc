import React from 'react';

const DisplayPerson = ({person}) => (
    <p>{person.name}</p>
)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }
  addPerson = (event) => {
      event.preventDefault()
      const personObject = {
          name: this.state.newName
      }

      const persons = this.state.persons.concat(personObject)
      this.setState({
          persons: persons,
          newName: ''
      })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <DisplayPerson key={person.name} person={person} />)}
      </div>
    )
  }
}

export default App
