import {useState} from 'react'
import authService from '../appwrite/auth'
import {Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button,Input,Logo} from './index'

function Login() {
        const {register , handleSubmit} = useForm()
        const [error, setError] = useState("")
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const login = async(data) => {
            setError("")
            try {
                const session = await authService.login(data.email, data.password)
                if (session)  {
                    const userData=  await authService.getCurrentUser()
                        if(userData) dispatch(authLogin(userData))
                            navigate('/')
                }
            } catch (error) {
                setError(error.message)
            }
        }

  return (
    <div className='flex justify-center items-center w-full my-5 ' >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-auto max-w-[100px]">
                        <Logo />
                    </span>
            </div>
            <h2 className="text-center text-black text-2xl font-bold leading-tight">Sign in to your account</h2>

            <form onSubmit={handleSubmit(login)} className='text-black mt-8'>
                <div className='space-y-8'> 
                    <Input type="email"
                    label = ' Enter your email'
                    placeholder='Email '
                    className=' bg-cyan-200'
                    {...register("email",{
                        required : true,
                        validate: {
                            matchPattern: (value) => (
                            /^[^@]+@[^@]+$/.test(value) ||
                            "Enter a valid email address"
                            )
                        }
                    })}
                    />
                    <Input type="password"
                    label='Enter Your Password'
                    placeholder='Password'
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
                    className='w-full'
                    >Sign In</Button>
                </div>
                {error &&  <p className="text-red-600 mt-8 text-center">{error}</p> }
                 <p className="mt-2 text-center text-base text-black/60">
                    {"Don't have any account "}
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            </form>
        </div>
    </div>
  )
}

export default Login