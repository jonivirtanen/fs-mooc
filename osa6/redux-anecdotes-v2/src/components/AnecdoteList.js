import React from 'react'
import { setNotification, removeNotification} from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes
          .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={async () => {
                    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
                    console.log(updatedAnecdote)
                    const response = await anecdoteService.update(updatedAnecdote)
                    this.props.voteAnecdote(response)
                    this.props.setNotification(`You voted for ${updatedAnecdote.content}`)
                    setTimeout(() => {
                      this.props.removeNotification()
                    }, 5000)
                  }
                  }>
                    vote
                  </button>
                </div>
              </div>
              )
        }
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter))
}
const mapStateToProps = (state) => {
  return { 
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
   }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  removeNotification
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
