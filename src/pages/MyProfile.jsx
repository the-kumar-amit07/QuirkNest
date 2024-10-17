/* eslint-disable no-unused-vars */
import React from 'react';

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
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            {/* Username and Followers */}
            <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.followers.toLocaleString()} Followers</p>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* User Posts */}
        <div>
            <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
            <div className="space-y-6">
            {user.posts.map(post => (
                <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default MyProfile;
