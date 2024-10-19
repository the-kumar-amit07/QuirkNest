/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import authService from '../appwrite/auth';
import appwriteServices from '../appwrite/config'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Mock data for posts and user
const user = {
    username: 'john_doe',
    profilePicture: '', // Placeholder image
    followers: 1200,
    posts: [
        {
        id: 1,
        title: 'My First Blog Post',
        content: 'This is the content of my first blog post.'
        },
        {
        id: 2,
        title: 'A Day in My Life',
        content: 'Here is what I do in a day...'
        },
        {
        id: 3,
        title: 'My Favorite Recipes',
        content: 'Here are some of my favorite recipes to share with you...'
        }
    ]
    };

const MyProfile = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null);
    const {username} =useParams()
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await authService.searchByUsername(username)
                if (user) {
                    setUserData(user)
                } else {
                    setError('User not found')
                }
            } catch (error) {
                console.log("");
                
            }
        }
        fetchUserData()

    },[username])

    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        800: 3,
        600: 2,
        400: 1,
        }
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <CircleUserRound className='rounded-full h-20 w-20'  alt="user-profile" />
            {/* Username and Followers */}
            <div>
            <h1 className="text-3xl font-bold">{username}</h1>
            <p className="text-gray-600">{user.followers.toLocaleString()} Followers</p>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* User Posts */}
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
                <div>
                    
                </div>
        </div>
        </div>
    );
};

export default MyProfile;
