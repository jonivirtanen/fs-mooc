import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayVotes = (props) => {
  return (props.votes === undefined) ?
    ( <div></div> ) : ( <p>has {props.votes} votes </p> )  
}

const DisplayMostVoted = ({votes}) => {
    console.log(votes)
    let mostVoted = undefined
    
    votes.forEach(function(element, index, array) {
      if (mostVoted === undefined || votes[mostVoted] < element) {
        mostVoted = index
      }
    });

    console.log(mostVoted)
    return (
      <div>
      <h3>anecdote with most votes:</h3>
      <p>{anecdotes[mostVoted]}</p>
      <DisplayVotes votes={votes[mostVoted]}/>
      </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: Array(anecdotes.length)
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
    let copy = [...this.state.votes]
    if (!copy[this.state.selected]) {
        copy[this.state.selected] = 1
    } else {
        copy[this.state.selected] += 1
    }
    this.setState({votes: copy})
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <DisplayVotes votes={this.state.votes[this.state.selected]}/>
        <div>
        <Button handleClick={this.vote} text="vote" />
        <Button handleClick={this.randomise} text="next anecdote"/>
        </div>
        <DisplayMostVoted votes={this.state.votes} />
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