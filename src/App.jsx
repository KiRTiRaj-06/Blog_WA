import  React, { useState } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import { login , logout} from './store/authSlice'
import {  useDispatch } from 'react-redux'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
      const [loading ,setLoading] = useState(false)
      const dispatch = useDispatch()

      React.useEffect(()=> {
          authService.getCurrentUser()
          .then(()=>{
            if (userData) {
              dispatch(()=> login({userData}))
            }else{
                dispatch(logout())
            }
          })
          .finally(()=> setLoading(false))
      },[])

    return  !loading ?
    (
      <div className=' min-h-screen flex flex-wrap justify-center items-center'>
        <div className=' w-full block'>
        <Header/>
          <main>
            { <Outlet />}
          </main>
        <Footer/>
        </div>
      </div>
    ) : (
      <h3 className=" text-xl text-purple-500 ">
        Application is Loading
      </h3>
  )
}

export default App
