import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: null,
      user: null
    }
    
    this.handleCreateNewBlog = this.handleCreateNewBlog.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedBlogAppUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUserJson) {
      const user = JSON.parse(loggedBlogAppUserJson)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'Username or password invalid'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    this.setState({ user: null })
  }

  handleCreateNewBlog = (blog) => {
    this.setState({
      blogs: this.state.blogs.concat(blog)
    })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Login</h2>
    
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogList = () => {
      return (
        this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )
      )
    }
    
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification = { this.state.error } />
        { this.state.user === null ? loginForm() :
          <div> 
            <p>{ this.state.user.name } logged in <button onClick={this.handleLogout}> logout </button></p>
            <BlogForm handleCreateNewBlog={this.handleCreateNewBlog}/>
            { blogList() }
          </div> }
      </div>
    );
  }
}

export default App;
