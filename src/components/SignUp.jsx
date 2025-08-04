import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'
import {Button,Input,Logo} from './index'
import authService  from '../appwrite/auth'
import {login} from '../store/authSlice'
import { useForm } from 'react-hook-form'


function SignUp() {
    const [error,setError]=useState('')
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup= async(data) =>{
            setError('')
            try {
                const userData=  await  authService.createAccount()
                if (userData) {
                    const userData =    authService.getCurrentUser()
                    dispatch(login(userData))
                    navigate('/')
                }
            } catch (error) {
                setError(error.message)
            }
    }

  return (
    <div className='flex justify-center items-center w-full' >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-auto max-w-[100px]">
                        <Logo  />
                    </span>
            </div>
            <h2 className=" m-2 mb-4 text-center text-2xl text-black font-bold leading-tight">Create your account</h2>
    
                <form  onSubmit={handleSubmit(signup)}>
                    <div className='flex flex-col items-center text-black space-y-5'>
                        <Input 
                            className='  bg-cyan-200 border-purple-400'
                            label=' Enter Your Full Name'
                            placeholder='Name :'
                            {...register('name',{
                                required: true
                            })}
                            />
                        <Input type="email"
                            label = ' Enter your email '
                            placeholder='EMAIL ADDRESS :'
                            className=' bg-cyan-200'
                            {...register("email",{
                                    required : true,
                                    validate: {
                                        matchPattern: (value) => (
                                            /^[^@]+@[^@]+$/.test(value) ||
                                            "Enter a valid email address"
                                        )
                                    }
                                }
                        )
                    }
                    />
                    <Input type="password"
                                label='Enter Your Password'
                                placeholder='PASSWORD :'
                                className=' bg-cyan-200 border-purple-400'
                                {...register('password',{
                                    required: true,
                                    validate: (value) =>(
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                            "Enter a valid password"
                                    )
                    })}
                    />
                    <Button type='submit'
                        className='w-auto'
                            >
                        Create Account
                        </Button>
                    </div>
                {error && <p className="text-red-600 mt-8 text-center '">{error}</p> }
                     <p className="mt-2 text-center text-base text-black/60">
                  {  "Already have an account? Go to " }
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                    </p>
                </form>
        </div>
    </div>
  )
}

export default SignUp