import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, removeBlog } from '../reducers/blogReducer'
import { bindActionCreators } from 'redux';
import { Card } from 'semantic-ui-react';

class Blog extends React.Component {
  handleRemoval = () => {
    this.props.removeBlog()
    this.props.history.push('/')
  }

  render() {
    const { blog } = this.props 
    if (blog) {
      return (
        <Card> 
        <Card.Content>
          <Card.Header>{ blog.title } - { blog.author }</Card.Header>
          <Card.Meta><a href={ blog.url }>  Link to blog </a></Card.Meta>
          <Card.Description>{ blog.likes } <button onClick={ this.props.voteBlog }> Like </button></Card.Description>
          <Card.Description>added by { blog.user.name }</Card.Description>
          <Card.Description><button onClick={ this.handleRemoval }>Delete</button></Card.Description>
        </Card.Content> 
        </Card>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (state.blogs.length === 0) {
    return { }
  }
  
  const blog = state.blogs.filter(b => 
    b.id === props.blogid)
  
  return { blog: blog[0] }
}

const mapDispatchToProps = (dispatch, props) => 
  bindActionCreators({
  voteBlog: () => voteBlog(props.blogid),
  removeBlog: () => removeBlog(props.blogid)
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
