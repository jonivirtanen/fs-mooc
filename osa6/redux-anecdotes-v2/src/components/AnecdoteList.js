import React from 'react'
import { setNotification, removeNotification} from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

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
                    this.props.voteAnecdote(anecdote)
                    this.props.setNotification(`You voted for ${ anecdote.content }`, 10)
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
