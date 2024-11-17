import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../App'

const Post = () => {
    const { id } = useParams()
    const API_URL = "https://blog-page-mern-backend.onrender.com"
    const [post,setpost] = useState({})
    const navigate = useNavigate()
    const user = useContext(userContext)
    async function getPostById() {
        try{
            const response = await axios.get(`${API_URL}/post/getpost/${id}`)
            setpost(response.data)
        }
        catch(err){
            console.log(`Error in Get post by Id`)
        }
    }

    useEffect(() =>{
        getPostById()
    },[])

    async function handleDelete(event) {
        try{
            const response = await axios.delete(`${API_URL}/post/deletepost/${id}`)
            if(response){
                navigate('/')
            }
        }
        catch(err){
            console.log(`Error in Delete Post by Id`)
        }
    }

  return (
    <section>
        <div className='flex md:px-44 px-5 py-20 flex-col justify-center'>
            <img src={`${API_URL}/images/${post.file}`} alt="Single Post" />
            <h2 className='pt-3 text-3xl md:text-5xl font-bold'>{post.title}</h2>
            <p className='text-lg'>{post.description}</p>
            {
                user.email == post.email ?
                <div className='flex gap-5 pl-4 pt-3'>
                    <Link to={`/editpost/${post._id}`}><button className='bg-green-600 px-5 hover:bg-green-300 duration-200 py-1 text-white text-lg rounded'>Edit</button></Link>
                    <button onClick={() =>handleDelete(event)} className='bg-red-600 px-5 hover:bg-red-300 duration-200 py-1 text-white text-lg rounded'>Delete</button>
                </div> :
                <></>
            }
        </div>
    </section>
  )
}

export default Post
