import React from 'react'

const Notification = ({ notificationType, notification }) => {
  if (notification === null) {
    return null
  }

  return (
    notificationType === 0 ? 
    <div className="notificationBox notification">
      { notification }
    </div> :
    <div className="notificationBox error">
      { notification }
    </div>
  )
}

export default Notification