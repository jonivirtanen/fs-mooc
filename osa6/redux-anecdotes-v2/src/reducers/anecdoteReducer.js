import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !== action.data.id)

    return [...old,  action.data ]
  case 'CREATE':
    return [...store, action.data ]
  
  case 'INIT_ANECDOTES':
    return action.data

  default:
    return store
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })   
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer