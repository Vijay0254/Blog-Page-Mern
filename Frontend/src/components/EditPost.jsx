import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {

    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const API_URL = "http://localhost:3000"
    const navigate = useNavigate()
    const { id } = useParams()

    async function handleSubmitPost(event) {
        event.preventDefault()
        try{
            const response = await axios.put(`${API_URL}/post/editpost/${id}`, {title, description})
            if(response.data.message == "Post not found"){
                alert("Post Not Found")
            }
            else{
                navigate('/')
            }
        }
        catch(err){
            console.log(`Error in Handle Submit Post - ${err}`)
        }
    }

    async function handleEdit() {
        try{
            const response = await axios.get(`${API_URL}/post/getpost/${id}`)
            if(response){
                settitle(response.data.title)
                setdescription(response.data.description)
            }
        }
        catch(err){
            console.log(`Error in Handle Edit - ${err}`)
        }
    }

    useEffect(() =>{
        handleEdit()
    }, [])

  return (
    <section className='flex justify-center items-center'>
        <form action="" className='gap-y-4 flex border-2 py-7 w-2/3 md:w-1/2 border-slate-500 p-5 rounded my-10 flex-col'>
            <h1 className='text-2xl font-bold'>Create Post</h1>
            <input value={title} onChange={(event) =>settitle(event.target.value)} className='border-2  px-3 rounded py-2 border-slate-300 outline-offset-2 outline-blue-300' type="text" placeholder='Enter Title' />
            <textarea value={description} onChange={(event) =>setdescription(event.target.value)} className='resize-none border-slate-300 outline-offset-2 outline-blue-300 border-2 rounded px-3 py-2' name="" placeholder='Enter Description' id="" cols="30" rows="10"></textarea>
            <button className='bg-green-700 py-2 hover:bg-green-500 duration-200 text-lg text-white' onClick={() =>handleSubmitPost(event)}>Post</button>
        </form>
    </section>
  )
}

export default EditPost