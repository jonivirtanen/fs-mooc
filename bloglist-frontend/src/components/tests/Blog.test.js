import React from 'react'
import { shallow } from 'enzyme'
import Blog from '../Blog'

describe.only('<Blog />', () => {
  const blog = {
    title: 'Testausta',
    author: 'Masa Mainio',
    likes: 10,
    user: 1
  }

  it('after clicking name the details are displayed', () => {
    const blogComponent = shallow(<Blog blog={blog} />)
    console.log(blogComponent.debug())

    const titleAndAuthor = blogComponent.find('.titleAndAuthor')

    expect(titleAndAuthor.text()).toContain(blog.title)
    expect(titleAndAuthor.text()).toContain(blog.author)
    expect(titleAndAuthor.text()).not.toContain(blog.likes)
    expect(titleAndAuthor.text()).not.toContain(blog.user)

    titleAndAuthor.simulate('click')

    const details = blogComponent.find('.details')

    expect(details.text()).toContain(blog.title)
    expect(details.text()).toContain(blog.author)
    expect(details.text()).toContain(blog.likes)
    expect(details.text()).toContain(blog.user)

  })
})