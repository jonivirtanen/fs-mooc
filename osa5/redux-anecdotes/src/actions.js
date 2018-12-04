import { asObject } from './reducer'

const actionFor = {
  voteForAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }, 
  anecdoteCreation(content) {
    const obj = asObject(content)
    return {
      type: 'NEW_ANECDOTE',
      data: obj
    }
  }
}

export default actionFor