import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      notification: null,
      notificationType: 0,
      user: null
    }
    
    this.handleCreateNewBlog = this.handleCreateNewBlog.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a, b){
        return b.likes - a.likes
      })

      this.setState({ blogs })
    })

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
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        notification: 'Username or password invalid',
        notificationType: 1
      })
      setTimeout(() => {
        this.setState({ notification: null, notificationType: 0 })
      }, 5000)
    }
  }

  handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    this.setState({ user: null })
  }

  handleCreateNewBlog = async (blog) => {
    try {
      const response = await blogService
        .create(blog)

      console.log(response)
      this.setState({
        blogs: this.state.blogs.concat(response),
        notification: `New blog '${ response.title }' by ${ response.author } added`
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch (exception) {
      this.setState({ 
        notificationType: 1,
        notification: exception.message
      })
      setTimeout(() => {
        this.setState({ notificationType: 0, notification: null })
      }, 5000)
    }
  }

  handleUpdateBlog = async (blog) => {
    const res = await blogService.update(blog.id, blog)
  }

  handleRemoveBlog = async (id) => {
    const blog = this.state.blogs.find(b => b.id === id)
    console.log(id)

    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const blogs = this.state.blogs.filter(b => b.id !== blog.id)
        this.setState({
          blogs,
          notification: `Blog ${blog.title} was removed`
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000)
      } catch (exception) {
        this.setState({
          notificationType: 1, notification: exception.message
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      }
    } 
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Login</h2>
    
        <form onSubmit={ this.login }>
          <div>
            username
            <input
              type="text"
              name="username"
              value={ this.state.username }
              onChange={ this.handleLoginFieldChange }
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={ this.state.password }
              onChange={ this.handleLoginFieldChange }
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogList = () => {
      return (
        this.state.blogs.map(blog => 
          <Blog 
            key={ blog.id }
            blog={ blog }
            handleUpdate={ this.handleUpdateBlog }
            handleRemove={ this.handleRemoveBlog }
          />
        )
      )
    }
    
    return (
      <div>
        <h2>blogs</h2>
        <Notification notificationType={ this.state.notificationType } notification = { this.state.notification } />
        { this.state.user === null ? 
        <Togglable buttonLabel="Login">
          { loginForm() }
        </Togglable> :
          <div> 
            <p>{ this.state.user.name } logged in <button onClick={ this.handleLogout }> logout </button></p>
            <Togglable buttonLabel="New Blog" ref={ component => this.blogForm = component }>
              <BlogForm handleCreateNewBlog={ this.handleCreateNewBlog } />
            </Togglable>
            { blogList() }
          </div> }
      </div>
    );
  }
}

export default App;
