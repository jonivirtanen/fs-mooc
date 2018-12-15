import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogSubmit = (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      
      this.props.createBlog(blog)
      this.props.setNotification(`New blog with a name ${blog.title} by ${blog.author} was created`, 0, 5)
      this.setState({ title: '', author: '', url: '' })    
    } catch (exception) {
      this.props.setNotification('Something went wrong', 1, 5)
    }
  }

  render() {
    return (
      <div>
        <h2>Create new</h2>
    
        <form onSubmit={ this.handleBlogSubmit }>
          <div>
            Title
            <input
              type="text"
              name="title"
              value={ this.state.title }
              onChange={ this.handleBlogFieldChange }
            />
          </div>
          <div>
            Author
            <input
              type="text"
              name="author"
              value={ this.state.author }
              onChange={ this.handleBlogFieldChange }
            />
          </div>
          <div>
            Url
            <input
              type="text"
              name="url"
              value={ this.state.url }
              onChange={ this.handleBlogFieldChange} />
          </div>
          <button type="submit"> create </button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { setNotification, createBlog }
)(BlogForm)
