import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <div>
        <button onClick={handleClick}>{text}</button>
    </div>
)

const Display = (props) => {
    return (props.votes === undefined) ?
    <p>has 0 votes</p> : <p>has {props.votes} votes </p>  
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {}
    }
  }

  randomise = () => {
    let random
    do {
      random = Math.floor(Math.random() * Math.floor(anecdotes.length))
    } while (random === this.state.selected)
    this.setState({selected: random})
  }

  vote = () => {
    let copy = {...this.state.votes}
    console.log(this.state.votes)
    if (!copy[this.state.selected]) {
        copy[this.state.selected] = 1
    } else {
        copy[this.state.selected] += 1
    }
    this.setState({votes: copy})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <Display votes={this.state.votes[this.state.selected]}/>
        <Button handleClick={this.randomise} text="next anecdote"/>
        <Button handleClick={this.vote} text="vote" />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)