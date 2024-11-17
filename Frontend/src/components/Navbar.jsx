import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'

const Navbar = () => {
    const user = useContext(userContext)
    const API_URL = "http://localhost:3000"

    async function handleLogout() {
        try{
            const response = await axios.get(`${API_URL}/auth/logout`)
            if(response.data.message == "Token Deleted Successfully")
            {
                window.location.href = "/login"
            }
        }
        catch(err){
            console.log(`Error in Handle Logout - ${err}`)
        }
    }

  return (
    <header className='flex text-white bg-gray-800 items-center justify-between py-3 px-5'>
        <h3 className='text-2xl font-bold'>Blog App</h3>
        <ul className='flex gap-x-2 text-base md:gap-10 md:text-lg font-medium'>
            <li><Link to='/'>Home</Link></li>
            {
                user.username ? 
                <li><Link to='/create'>Create</Link></li>
                :
                <></>
            }
        </ul>
        {
            user.username ?
            <div>
                <input type='button' onClick={handleLogout} value="Logout" className='text-lg cursor-pointer' />
            </div>
            :
            <div>
                <h1 className='text-lg cursor-pointer'><Link to='/register'>Register/Login</Link></h1>
            </div>
        }
    </header>
  )
}

export default Navbar