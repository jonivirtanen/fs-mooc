import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from '../components/Blog'
import App from '../App'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<Blog />', () => {
  const blog = {
    title: 'Testausta',
    author: 'Masa Mainio',
    likes: 10,
    user: 1
  }

  it('after clicking name the details are displayed', () => {
    const blogComponent = shallow(<Blog blog={blog} />)

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

describe('<App />', () => {
  let app
  
  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponent = app.find(Blog)
      expect(blogComponent.length).toEqual(0)
    })
  })

  describe('when the user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('returns all blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
  
})
