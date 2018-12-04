import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: false,
    }
  }

  toggleMode = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  updateBlogLikes = () => {
    const blog = this.props.blog
    blog.likes += 1
    this.props.handleUpdate(blog)
  }

  handleRemove = () => {
    this.props.handleRemove(this.props.blog.id)
  }

  render() {
    const blog = this.props.blog 
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    
    return (
      this.state.showAll ? 
        <div className="details" style={ blogStyle } onClick={ this.toggleMode }>
          <h3>{ blog.title } - { blog.author }</h3>
          <a href={ blog.url }>  { blog.url } </a>
          <div>{ blog.likes } <button onClick={ this.updateBlogLikes }> Like </button></div>
          <div>added by { blog.user.name }</div>
          <button onClick={ this.handleRemove }>Delete</button>
        </div> :
        <div className="titleAndAuthor" style={ blogStyle } onClick={ this.toggleMode }>
          <h3>{ blog.title } - { blog.author }</h3>
        </div>
    )
  }
}

export default Blog

// const Blog = ({blog}) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>  
// )