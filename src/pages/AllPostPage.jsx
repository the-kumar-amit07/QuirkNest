/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import appwriteServices from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPostPage() {
  const [posts, setPosts] = useState([])
  useEffect(() => { }, [])
  appwriteServices.getAllPosts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  
  return (
    <div className='w-full py-8 '>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/2' >
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPostPage