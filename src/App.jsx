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
      const userData =  authService.getCurrentUser()

      React.useEffect(()=> {
        const userData =  authService.getCurrentUser()
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
      <div className=' h-screen flex flex-wrap justify-center items-center bg-black'>
        <div className=' w-full block'>
        <Header/>
          <main className='flex flex-wrap w-full  h-min-600 h-auto  justify-center items-center border border-teal-400 pt-16'>
            {/* { userData? <h1 className='"text-white text-4xl font-bold shadow-blue-400 hover:text-teal-300 transition-colors duration-300 ease-in '>
              LOGIN TO SEE THE BLOGS</h1> :  null} */}
              <Outlet />
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
