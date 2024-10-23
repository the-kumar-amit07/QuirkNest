/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import authService from "../appwrite/auth";
import appwriteServices from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button,Container,PostCard,Loading } from "../components";
import Masonry from "react-masonry-css";

    const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const [searchedUser, loggedInUser] = await Promise.all([
            authService.searchByUsername(username),
            authService.getCurrentUser(),
            ]);
            console.log("Searched User:", searchedUser);
            console.log("LoggedInUser", loggedInUser);
            
            if (searchedUser) {
            setUserData(searchedUser);
            setCurrentUser(loggedInUser);
            const isFollowing = await authService.isUserFollowing(
                loggedInUser.$id,
                searchedUser.$id
            );
                setIsFollowing(isFollowing);
                const searchedUserPost = await appwriteServices.getUserPosts(searchedUser.userId)
                console.log("searchedUserPost:",searchedUserPost);
                setPosts(searchedUserPost.documents)
                setLoading(false)
            } else {
            setError("User not found");
            }
        } catch (error) {
            console.log("",error);
        }
        };
        fetchUserData();
    }, [username]);

    const handleUnfollow = async () => {
        if (!currentUser) return;
        try {
        await authService.unfollowUser(currentUser.$id, userData.$id);
        setIsFollowing(false);
        } catch (error) {
        console.log("error while unfollowing", error);
        }
    };

    const handlaFollow = async () => {
        if (!currentUser) return;
        try {
            await authService.followUser(currentUser.$id, userData.$id);
            setIsFollowing(true);
        } catch (error) {
        console.log("error while following", error);
        }
    };
    
        const handleChat = () => {
        if (currentUser && userData) {
            navigate (`/chat/${userData.$id}`)
        }
    }
    
        const isSameUser = currentUser?.$id === userData?.$id
        // console.log(isSameUser ? "Yes Same User":"No Users aren't same");
        

    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        800: 3,
        600: 2,
        400: 1,
    };
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex flex-col items-start">
        <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <CircleUserRound
            className="rounded-full h-20 w-20"
            alt="user-profile"
            />
            {/* Username and Followers */}
            <div>
            <h1 className="text-3xl font-bold">{userData?.username}</h1>
            <p className="text-gray-600">
                1 Followers
            </p>
            </div>
        </div>
        {
                !isSameUser && (
                    <div className="flex space-x-4 p-4">
                    <Button
                    className={`${
                        isFollowing
                        ? "bg-red-600 hover:bg-red-700" :"bg-purple-700 hover:bg-purple-800"
                    }`}
                    onClick={isFollowing ? handleUnfollow : handlaFollow}
                    >
                    {isFollowing ? "Unfollow" : "Follow" }
                    </Button>
                        
                    {currentUser && userData && (
                            <Button
                                onClick={handleChat}
                                className="bg-purple-700">
                                Chat
                            </Button>
                    )}
                </div>
                )
        }    
        </div>
        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* User Posts */}
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
                <div className="w-full py-8 bg-slate-50">
                    <Container>
                        {loading ? (
                            <div className='flex justify-center items-center h-screen'>
                            <Loading type='cubes' color='purple' />
                            </div>
                        ) : (
                                <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className='my-masonry-grid'
                                columnClassName="my-masonry-grid_column"
                                >
                                    {posts.length === 0 ? (
                                        <h2 className='text-xl font-semibold text-gray-700'>No posts available</h2>
                                    ) : (
                                            posts.map((post) => (
                                                <div key={post.userId} className='mb-6 break-inside-avoid'>
                                                <PostCard {...post} className="rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300" />
                                                </div>
                                        ))
                                    )}
                                </Masonry>
                        )}
                    </Container>
                </div>
        </div>
        </div>
    );
};

export default MyProfile;
