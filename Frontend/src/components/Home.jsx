import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const API_URL = "https://blog-page-mern-backend.onrender.com"
  const [posts,setposts] = useState([])

  async function getPost() {
    try{
      const response = await axios.get(`${API_URL}/post/getpost`)
      console.log(response)
      setposts(response.data)
    }
    catch(err){
      console.log(`Error in Get Post - ${err}`)
    }
  }

  useEffect(() =>{
    getPost()
  }, [])

  return (
    <section className='my-10'>
      <div className='flex flex-col gap-y-6 px-7 md:px-12 justify-center'>
        {
          posts.map((element) =>(
            <Link key={element._id} to={`/post/${element._id}`}>
              <div className='border-2 flex md:flex-row flex-col gap-3 border-slate-300 rounded p-3'>
                <img src={`${API_URL}/images/${element.file}`} alt="post image" className='md:w-[400px]' />
                <div className='flex flex-col'>
                  <h2 className='text-3xl font-bold'>{element.title}</h2>
                  <p className="text-lg">{element.description}</p>
                </div>              
              </div>
            </Link>
          ))
        }
      </div>
    </section>
  )
}

export default Home
