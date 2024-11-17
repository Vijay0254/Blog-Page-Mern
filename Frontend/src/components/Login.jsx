import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()
    const API_URL = "http://localhost:3000"

    axios.defaults.withCredentials = true
    async function handleLogin(event) {
        event.preventDefault()
        try{
            const response = await axios.post(`${API_URL}/auth/login`,{email: email, password: password})
            if(response.data.message == "User exist"){
                setemail("")
                setpassword("")
                window.location.href = "/"
            }
            if(response.data.message == "Password is wrong"){
                alert('Password is wrong')
                setemail("")
                setpassword("")
            }
            if(response.data.message == "User Not Found"){
                alert('User Not Found...Please Register')
                setemail("")
                setpassword("")
            }
        }
        catch(err){
            console.log(`Error in Handle Login`)
        }
    }

  return (
    <section className='flex justify-center items-center'>
        <div className='flex gap-y-5 w-[400px] border-2 rounded-lg p-5 pb-8 px-6 border-gray-400 my-28 flex-col '>
            <h2 className='text-3xl font-bold'>Login</h2>
            <form action="" className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-lg'>Email</label>
                    <input value={email} onChange={(event) =>setemail(event.target.value)} placeholder='Enter Email' className='px-2 outline-offset-2 outline-blue-300 py-1 border-2' type="email" id='email' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-lg'>Password</label>
                    <input placeholder='Enter Password' value={password} onChange={(event) =>setpassword(event.target.value)} className='px-2 outline-offset-2 outline-blue-300 py-1 border-2' type="password" id='password' />
                </div>
                <button onClick={() =>handleLogin(event)} className='bg-blue-600 py-2 hover:bg-blue-400 duration-300 text-white rounded'>Login</button>
            </form>
            <div className='flex gap-y-1 flex-col'>
                <p>Doesn't have an Account?</p>
                <Link to='/register'><button className='w-full bg-green-700 text-white py-2 rounded hover:bg-green-400'>Register</button></Link>
            </div>
        </div>
    </section>
  )
}

export default Login