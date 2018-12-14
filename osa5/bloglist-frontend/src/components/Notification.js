import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.notification.length === 0 ) {
    return null
  }

  return (
    props.notificationType === 0 ? 
    <Message>{props.notification}</Message>
    :
    <Message negative>{ props.notification }</Message>
    
  )
}

const mapStateToProps = (state) => {
  return { 
    notification: state.notification.notificationMessage,
    notificationType: state.notification.notificationType
  }
} 

export default connect(mapStateToProps)(Notification)