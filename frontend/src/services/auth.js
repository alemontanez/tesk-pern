import api from './api'

export const registerRequest = (user) => {
  return api.post('/auth/register', user)
}

export const loginRequest = (user) => {
  return api.post('/auth/login', user)
}

export const logoutRequest = () => {
  return api.post('/auth/logout')
}

export const verifyTokenRequest = () => {
  return api.get('/auth/verify')
}