/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/config'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components'
function HomePage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteServices.getAllPosts()
            .then((post) => {
                if (post) {
                    setPosts(post.documents)
                }
            })
    },[])

    return (
        <div className='w-full py-8 bg-slate-50'>
            {/* Animated Banner */}
            <div className='relative bg-gradient-to-r from-purple-500 to-purple-700 py-20 text-white mb-8 overflow-hidden'>
                <div className='container mx-auto px-6 flex items-center justify-between'>
                    <div className='w-full lg:w-1/2'>
                        <h1 className='text-5xl font-bold mb-4 animate-fade-in-up'>WELCOME TO OUR BLOG</h1>
                        <p className='text-lg mb-6 animate-fade-in-up animation-dalay-1'>Discover a wide range of insightful posts and stories.</p>
                        <Link to='/post' className='bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-all duration-300 animate-fade-in-up animation-delay-2'>
                            Get Started
                        </Link>
                    </div>
                    <div className='hidden lg:block lg:w-1/2 animate-fade-in-right'>
                        <img src=""alt="Banner" className="w-full h-auto" />
                    </div>
                </div>
            </div>
            {/* Posts Section */}
            {posts.length === 0 ? (
                    <div className='w-full py-8 mt-4 text-center bg-purple-100'>
                        <Container>
                            <div className='flex flex-wrap justify-center'>
                                <div className='p-2 w-full'>
                                    <h1 className='text-2xl font-bold text-purple-700 hover:text-purple-500'>
                                        No posts available
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                ) : (
                        <div className='w-full py-8'>
                            <Container>
                                <div className='flex flex-wrap'>
                                    {
                                        posts.map((post) => (
                                            <div key={post.$id} className='p-4 w-full md:w-1/2 lg:w-1 xl:w-1/4'>
                                                <PostCard {...post}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Container>
                    </div>
                )}
        </div>
    )
}

export default HomePage