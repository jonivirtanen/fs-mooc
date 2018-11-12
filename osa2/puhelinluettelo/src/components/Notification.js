import React from 'react'

const Notification = ({message, error}) => {
    if (message === null) {
        return null
    }
    if (error) {
        return (
        <div className="messagebox error">
            {message}
        </div>
        )
    }
    return (
        <div className="messagebox notification">
            {message}
        </div>
    )
}

export default Notification