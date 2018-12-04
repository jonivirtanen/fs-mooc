import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, username, password, handleLoginFieldChange }) => (
  <div>
    <h2>Login</h2>

    <form onSubmit={ login }>
      <div>
        username
        <input
          type="text"
          name="username"
          value={ username }
          onChange={ handleLoginFieldChange }
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleLoginFieldChange }
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm