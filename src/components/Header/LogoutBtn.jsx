import React from 'react'
import { useDispatch } from 'react-redux'
import authService  from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
        const dispatch = useDispatch()
        function logoutHandler(){
            authService.logout().then(()=>{
              dispatch(logout())
            })
        }
  return (
    <button onClick={logoutHandler} className='bg-cyan-300 rounded-2xl'>Logout</button>
  )
}

export default LogoutBtn