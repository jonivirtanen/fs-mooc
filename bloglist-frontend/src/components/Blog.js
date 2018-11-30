import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: false
    }
  }

  toggleMode = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const individualBlog = this.props.blog 
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      this.state.showAll ? 
        <div style={ blogStyle } onClick={ this.toggleMode }>
          <h3>{ individualBlog.title } - { individualBlog.author }</h3>
          <a href={ individualBlog.url }>  { individualBlog.url } </a>
          <div>{ individualBlog.likes } <button> Like </button></div>
          <div>added by { individualBlog.user.name }</div>
        </div> :
        <div style={ blogStyle } onClick={ this.toggleMode }>
          <h3>{ individualBlog.title } - { individualBlog.author }</h3>
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