const reducer = (store = [], action) => {
  console.log(action)
  switch (action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !== action.data.id)

    return [...old,  action.data ]
  case 'CREATE':
    console.log('create action data', action.data)
    return [...store, action.data ]
  
  case 'INIT_ANECDOTES':
    return action.data

  default:
    return store
  }
}

export const voteAnecdote = (data) => {
  return { type: 'VOTE', data }
}

export const createAnecdote = (data) => {
  return { type: 'CREATE', data }
}

export const anecdoteInitialization = (data) => {
  return { type: 'INIT_ANECDOTES', data }
}

export default reducer