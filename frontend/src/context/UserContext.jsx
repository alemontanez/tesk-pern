import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile } from '../services/user'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UseUser must be used within an UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {

  const [profile, setProfile] = useState({})

  const fetchProfile = async () => {
    try {
      const res = await getProfile()
      setProfile(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function userProfile () {
      await fetchProfile()
    }
    userProfile()
  }, [])

  return (
    <UserContext.Provider value={{
      profile
    }}>
      {children}
    </UserContext.Provider>
  )
}