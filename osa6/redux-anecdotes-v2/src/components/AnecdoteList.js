import React from 'react'
import { setNotification, removeNotification} from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    console.log(this.props)
    const { anecdotes, filter } = this.props

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
                this.props.voteAnecdote(anecdote.id)
                this.props.setNotification(`You voted for ${anecdote.content}`)
                setTimeout(() => {
                  this.props.removeNotification()
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

const mapStateToProps = (state) => {
  return { 
    anecdotes: state.anecdotes,
    filter: state.filter
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
