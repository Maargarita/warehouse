import React, {FC, useEffect, useState} from 'react'
import { AppRouter } from './components/router/AppRouter'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import { changeUserAuth, setUser } from './store/slices/userSlice'
import { Spinner } from './components/Spiner'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(setUser(jwtDecode(token)))
      dispatch(changeUserAuth(true))
    }
    setIsLoading(false)
  }, [])

  if (isLoading){
    return <Spinner/>
  }

  return (
    <>
      <ToastContainer className='toasts'/>
      <AppRouter/>
    </>
  )
}

export default App;