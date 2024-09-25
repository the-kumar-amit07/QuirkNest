/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteServices from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';

function PostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteServices.getPosts(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate('/');
                    }
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteServices.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteServices.deleteFile(post.featuredImage);
                    navigate('/');
                }
            });
    };

    return post ? (
        <div className='py-8 bg-gray-50'>
            <Container>
                {/* Post Image Section */}
                <div className='w-full  flex justify-center mb-6 relative border border-gray-200 rounded-lg overflow-hidden shadow-md'>
                    <img
                        src={appwriteServices.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='w-full h-auto object-cover transition-transform duration-300 transform hover:scale-105'
                    />
                    {isAuthor && (
                        <div className='absolute right-4 top-4 flex space-x-2'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor='bg-purple-600'
                                    className='text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-all'
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor='bg-red-600'
                                className='text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all'
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                {/* Post Title */}
                <div className='w-full mb-4 text-center'>
                    <h1 className='text-4xl lg:text-5xl font-semibold text-purple-900'>{post.title}</h1>
                </div>
                {/* Post Content */}
                <div className='prose prose-lg max-w-none text-gray-700 mx-auto'>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default PostPage;