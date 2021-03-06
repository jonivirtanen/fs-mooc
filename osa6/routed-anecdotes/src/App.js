import React from 'react'
import {
  BrowserRouter as Router,
  Route, NavLink, Link
} from 'react-router-dom'
import { Container, Table, Grid, Image } from 'semantic-ui-react'

const Menu = () => {
  const basestyle = {
    margin: '5px',
    backgroundColor: '#d3ad02',
    overflow: 'hidden'
  }

  const buttonStyle= {
    float: 'left',
    textAlign: 'center',
    padding: '14px 16px',
    fontSize: '17px',
  }

  const activeStyle = {
    backgroundColor: '#91d302',
    fontWeight: 'bold',
    color: 'red',
  }
  
  return (
    <div style={basestyle}>
      <NavLink exact to="/" style={buttonStyle} activeStyle={activeStyle}>anecdotes</NavLink>&nbsp;
      <NavLink to="/new" style={buttonStyle} activeStyle={activeStyle}>create new</NavLink>&nbsp;
      <NavLink to="/about" style={buttonStyle} activeStyle={activeStyle}>about</NavLink>&nbsp;
    </div>
  )
}
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table>
      <Table.Body>
      {anecdotes.map(anecdote =>
        <Table.Row>
          <Table.Cell>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Notification = ({notification}) => {
  const style = {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px',
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}    


const About = () => (
  <Grid columns={2}>
    <Grid.Column width={10}><h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Grid.Column>
    <Grid.Column width={6}>
      <Image src='https://upload.wikimedia.org/wikipedia/commons/0/0e/Bjarne-stroustrup_%28cropped%29.jpg'/>
    </Grid.Column>
  </Grid>
)


const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: 'Hei vain'
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created` 
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    },  10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <Notification notification={this.state.notification}/>
              <Route 
                exact path="/"
                render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> }
              />
              <Route
                exact path="/anecdotes/:id"
                render={({match}) => {
                  const anecdote = this.anecdoteById(match.params.id)
                  return (
                    <div>
                      <h2>{anecdote.content} by {anecdote.author}</h2>
                      <p>
                        has {anecdote.votes} votes
                      </p>
                      <p>
                        for more info see: <a href={anecdote.info}>{anecdote.info}</a>
                      </p>
                    </div>
                  )
                }}
              />
              <Route
                path="/about/"
                render={() => <About /> } 
              />      
              <Route
                path="/new"
                render={({history}) => <CreateNew history={history} addNew={this.addNew}/>}
              />
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App