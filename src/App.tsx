import React, { useEffect,Component } from 'react'
import './App.less'
import { useGetCurrentUser } from './api'
import { useRecoilState } from 'recoil'

class App extends Component {
  const [user, setUser] = useRecoilState(userState)
  const { locale } = user

  const { data: currentUser, error } = useGetCurrentUser()

  useEffect(() => {
    console.log('currentUser: ', currentUser)
    setUser({ ...user, username: currentUser?.username || '', logged: true })
  }, [currentUser])

 
  render(): React.ReactNode {
    return (
      <div className='App'>
        this is a new world
      </div>
    )
  }
}

export default App
