import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class User extends React.Component {
  render() {
    if (this.props.user) {
      return(
        <div>
          <h2>{this.props.user.name}</h2>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Added Blogs</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.user.blogs.map(b => 
                <Table.Row key={b._id}>
                  <Table.Cell>{b.title} by {b.author}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (state.users.length === 0) {
    return {  }
  }
  
  const user = state.users.filter(user => user.id === props.uid)
  return {user: user[0]}
}

export default connect(mapStateToProps)(User)