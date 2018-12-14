import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...store, action.data]

    case 'INIT_BLOGS':
      return action.data

    case 'VOTE':
      const old = store.filter(b => b.id !== action.data.id)
      return [...old, action.data]

    case 'REMOVE':
      const blogs = store.filter(b => b.id !== action.data.id)
      return blogs

    default:
      return store
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const voteBlog = (blogId) => {
  return async (dispatch) => {
    const blogsBefore = await blogService.getAll()
    const blog = blogsBefore.find(blog => blog.id === blogId)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await blogService.update(updatedBlog)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    const blog = await blogService.remove(blogId)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer