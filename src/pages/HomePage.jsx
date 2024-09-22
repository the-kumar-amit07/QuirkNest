/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import appwriteServices from '../appwrite/config';
import { Link } from 'react-router-dom';
import { Container, PostCard } from '../components';
import Banner from '../assets/banner-blog.png';

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteServices.getAllPosts()
            .then((post) => {
                if (post) {
                    setPosts(post.documents);
                }
            });
    }, []);

    return (
        <div className='w-full py-8 bg-gray-50'>
            {/* Animated Banner */}
            <div className='relative bg-gradient-to-r from-purple-600 to-purple-800 py-24 text-white mb-8 overflow-hidden'>
                <div className='container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between'>
                    <div className='w-full lg:w-1/2'>
                        <h1 className='text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up'>Welcome to Our Blog</h1>
                        <p className='text-lg mb-6 animate-fade-in-up animation-delay-1'>Discover a wide range of insightful posts and stories.</p>
                        <Link to='/post' className='bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-all duration-300 animate-fade-in-up animation-delay-2'>
                            Get Started
                        </Link>
                    </div>
                    <div className='hidden lg:block lg:w-1/2 animate-fade-in-right'>
                        <img src={Banner} alt="Banner" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <Container>
                {posts.length === 0 ? (
                    <div className='w-full py-8 mt-4 text-center bg-purple-100 rounded-lg shadow'>
                        <h1 className='text-2xl font-bold text-purple-700 hover:text-purple-500'>
                            No posts available
                        </h1>
                    </div>
                ) : (
                    <div className='w-full py-8'>
                        <div className='flex flex-wrap justify-center'>
                            {
                                posts.map((post) => (
                                    <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                        <PostCard {...post} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default HomePage;