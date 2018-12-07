const initialState = 'render here notification...'

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data

  case 'REMOVE_NOTIFICATION':
    return ''

  default:
    return store
  }

}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION'})
    }, time * 1000)
  }
}

export const removeNotification = () => {
  return {type: 'REMOVE_NOTIFICATION'}
}

export default reducer