import React, { useContext, useState } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {

    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const [file,setfile] = useState("")
    const user = useContext(userContext)
    const API_URL = "https://blog-page-mern-backend.onrender.com"
    const navigate = useNavigate()

    async function handleSubmitPost(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('email', user.email)
        formData.append('file', file)
        try{
            const response = await axios.post(`${API_URL}/post/create`, formData)
            if(response.data.message == "Enter Title and Description"){
                alert('Enter Title and Description')
            }
            if(response.data.message == "Posted Successfully"){
                navigate('/')
            }
        }
        catch(err){
            console.log(`Error in Handle Submit Post - ${err}`)
        }
    }

  return (
    <section className='flex justify-center items-center'>
        <form action="" className='gap-y-4 flex border-2 py-7 w-2/3 md:w-1/2 border-slate-500 p-5 rounded my-10 flex-col'>
            <h1 className='text-2xl font-bold'>Create Post</h1>
            <input value={title} onChange={(event) =>settitle(event.target.value)} className='border-2  px-3 rounded py-2 border-slate-300 outline-offset-2 outline-blue-300' type="text" placeholder='Enter Title' />
            <textarea value={description} onChange={(event) =>setdescription(event.target.value)} className='resize-none border-slate-300 outline-offset-2 outline-blue-300 border-2 rounded px-3 py-2' name="" placeholder='Enter Description' id="" cols="30" rows="10"></textarea>
            <input onChange={(event) =>setfile(event.target.files[0])} type="file" className='border-2 border-slate-300 px-3 py-2' name="" id="" />
            <button className='bg-green-700 py-2 hover:bg-green-500 duration-200 text-lg text-white' onClick={() =>handleSubmitPost(event)}>Post</button>
        </form>
    </section>
  )
}

export default Create
