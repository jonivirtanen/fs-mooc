import React from 'react'

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

    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    this.setState({ title: '', author: '', url: '' })
    this.props.handleCreateNewBlog(blog)
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
