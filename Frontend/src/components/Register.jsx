import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [userName,setuserName] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()
    const API_URL = "http://localhost:3000"

    async function handleRegister(event) {
        event.preventDefault()
        try{
            const response = await axios.post(`${API_URL}/auth/register`,{username: userName, email: email, password: password})
            if(response.data.message == "Enter every details"){
                alert('Enter Every Details')
            }
            if(response.data.message == "User exist"){
                alert("User Already Exists")
                setuserName("")
                setemail("")
                setpassword("")
            }
            if(response.data.message == "User aded successfully"){
                setuserName("")
                setemail("")
                setpassword("")
                navigate('/login')
            }
        }
        catch(err){
            console.log(`Error in Handle Register - ${err}`)
        }
    }

  return (
    <section className='flex justify-center items-center'>
        <div className='flex gap-y-5 w-[400px] border-2 rounded-lg p-5 pb-8 px-6 border-gray-400 my-20 flex-col '>
            <h2 className='text-3xl font-bold'>Register</h2>
            <form action="" className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-lg'>Username</label>
                    <input value={userName} onChange={(event) =>setuserName(event.target.value)} placeholder='Enter Username' className='px-2 outline-offset-2 outline-blue-300 py-1 border-2' type="text" id='name' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-lg'>Email</label>
                    <input value={email} onChange={(event) =>setemail(event.target.value)} placeholder='Enter Email' className='px-2 outline-offset-2 outline-blue-300 py-1 border-2' type="email" id='email' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-lg'>Password</label>
                    <input value={password} onChange={(event) =>setpassword(event.target.value)} placeholder='Enter Password' className='px-2 outline-offset-2 outline-blue-300 py-1 border-2' type="password" id='password' />
                </div>
                <button onClick={() =>handleRegister(event)} className='bg-blue-600 py-2 hover:bg-blue-400 duration-300 text-white rounded'>Register</button>
            </form>
            <div className='flex gap-y-1 flex-col'>
                <p>Already Have Account?</p>
                <Link to='/login'><button className='w-full bg-green-700 text-white py-2 rounded hover:bg-green-400'>Login</button></Link>
            </div>
        </div>
    </section>
  )
}

export default Register