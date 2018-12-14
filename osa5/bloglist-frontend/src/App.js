import React from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import NavBar from './components/NavBar'
import User from './components/User'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './components/Blog';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    this.props.initializeBlogs()
    this.props.initializeUsers()
    const loggedBlogAppUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUserJson) {
      const user = JSON.parse(loggedBlogAppUserJson)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }
  login = (user) => {
    this.setState({user})
  }

  handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    this.setState({ user: null })
  }

  render() {    
    return (
      <Container>
        <Router>
          <div>
          <h2>blogs</h2>
          <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
          <Notification />
          { this.state.user === null ? 
          <Route 
            exact path='/login'
            render={({history}) => 
            <Togglable buttonLabel="Login">
              <LoginForm 
                history={history}
                onLogin={this.login}
              />
            </Togglable>
            }
          />
           :
            <div> 
              <Togglable buttonLabel="New Blog" ref={ component => this.blogForm = component }>
                <BlogForm />
              </Togglable>
              <Route 
                exact path='/users'
                render={() => <UserList /> }
              />
              <Route 
                exact path='/users/:id'
                render={({match}) => <User uid={match.params.id} />}
              />
              <Route
                exact path='/'
                render={() => <BlogList />}
              />
              <Route
                exact path='/blogs/:id'
                render={({match, history}) => <Blog blogid={match.params.id} history={history}/>}
              />
            </div> }
          </div>
        </Router>
      </Container>
    );
  }
}

export default connect(
  null,
  { initializeBlogs, initializeUsers }
)(App)
