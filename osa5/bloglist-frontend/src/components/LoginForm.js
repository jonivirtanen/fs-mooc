import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
  
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.props.history.push('/')
      this.props.onLogin(user)
    } catch (exception) {
      this.props.setNotification(`Username or password not valid`, 1, 5)
    }
  }

  render() {
    return (
      <Form>
        <h2>Login</h2>
        username
        <Form.Input name='username' value={this.state.username} onChange={this.handleLoginFieldChange} />
        password
        <Form.Input type='password' name='password' value={this.state.password} onChange={this.handleLoginFieldChange} />
        <Form.Button onClick={this.login}>Submit</Form.Button>
      </Form>
    )
  }
}


export default connect(
  null,
  { setNotification }
  )(LoginForm)