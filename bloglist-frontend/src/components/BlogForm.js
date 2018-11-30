import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
    console.log(this.props)
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    try{
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.setState({ title: '', author: '', url: '' })
      this.props.handleCreateNewBlog(blog)      
    } catch (exception) {
      this.setState({
        error: 'Something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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

export default BlogForm
