import React from 'react';

const DisplayPerson = ({person}) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.phone}</td>
    </tr>
)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', phone: '040-123456'},
        { name: 'Martti Tienari', phone: '040-123456' },
        { name: 'Arto Järvinen', phone: '040-123456' },
        { name: 'Lea Kutvonen', phone: '040-123456' }
      ],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }

  addPerson = (event) => {
      event.preventDefault()
      const personObject = {
          name: this.state.newName,
          phone: this.state.newPhone
      }
      if(this.state.persons.findIndex(person => person.name === personObject.name) === -1) {
        const persons = this.state.persons.concat(personObject)
        
        this.setState({
          persons,
          newName: '',
          newPhone: ''
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
        Rajaa näytettäviä: <input onChange={this.handleSearchChange}></input>
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
            {applyFilter.map(person => <DisplayPerson key={person.name} person={person} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
