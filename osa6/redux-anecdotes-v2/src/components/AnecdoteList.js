import React from 'react'
import { setNotification, removeNotification} from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, filter } = this.props.store.getState()

    const results = anecdotes.filter(a => a.content.includes(filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        {results.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(voteAnecdote(anecdote.id))
                this.props.store.dispatch(setNotification(
                  `You voted for ${anecdote.content}`
                ))
                setTimeout(() => {
                  this.props.store.dispatch(removeNotification())
                }, 5000);
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
