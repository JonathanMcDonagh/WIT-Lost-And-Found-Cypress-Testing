import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: 'http://localhost:3000/'
    baseURL: 'https://wit-lost-and-found.herokuapp.com/'
  })
}
