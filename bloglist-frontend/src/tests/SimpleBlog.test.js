import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Testausta',
    author: 'Masa Mainio',
    likes: 10
  }

  it('renders title, author and the number of likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthor = blogComponent.find('.titleAndAuthor')
    
    expect(titleAndAuthor.text()).toContain(blog.title)
    expect(titleAndAuthor.text()).toContain(blog.author)

    const likes = blogComponent.find('.likes')

    expect(likes.text()).toContain(blog.likes)
  })

  it('clicking the button 2 times calls event handler twice', () => {
    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})