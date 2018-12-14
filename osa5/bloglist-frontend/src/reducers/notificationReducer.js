const initialState = {
  notificationMessage: '',
  notificationType: 0
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.data

  case 'HIDE':
    return initialState

  default:
    return store
  }
}

export const setNotification = (notificationMessage, notificationType, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: { notificationMessage, notificationType }
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE'})
    }, time * 1000)
  }
}

export const removeNotification = () => {
  return {type: 'HIDE'}
}

export default reducer