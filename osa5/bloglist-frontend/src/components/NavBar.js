import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const navbar = ({ user, handleLogout }) => (
  <Menu>
    <Menu.Item link>
      <Link to='/'>Blogs</Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to='/users'>Users</Link>
    </Menu.Item>
    <Menu.Item link>
      {user !== null 
      ? 
        <em> {user.name} logged in <Button onClick={handleLogout}>Logout</Button></em> 
        : <Link to='/login'>login</Link>
      }
    </Menu.Item>
  </Menu>
)

export default navbar