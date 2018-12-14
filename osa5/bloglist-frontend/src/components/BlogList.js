import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'


class BlogList extends React.Component {
  render () {
    return (
      <Table>
        <Table.Body>
          {this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
            <Table.Row key={blog.id}>
              <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
    
  }
}
  
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(BlogList)