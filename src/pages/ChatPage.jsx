/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatBox } from '../components';
import { useParams } from 'react-router-dom';
import authService from '../appwrite/auth';

function ChatPage() {
    // const currentUser = useSelector((state) => state.auth.userData);
    // console.log("currentUser:", currentUser);
    // console.log("currentUser$Id:", currentUser.$id);
    const[sender,setSender] = useState(null)
    const { receiverId } = useParams();
    console.log("Receiver ID from URL params:", receiverId);
    const [receiver, setReceiver] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null); // New error state

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const [user, loggedInUser] = await Promise.all([
                    authService.searchByUsername(receiverId),
                    authService.getCurrentUser()
                ])
                console.log("The Receiver:", user);
                console.log("The Current User:", loggedInUser);
                
                if (user) {
                    setReceiver(user);
                    setSender(loggedInUser);
                } else {
                    setError("Receiver not found");
                }
            } catch (error) {
                console.error(error);
                setError("Error fetching user data");
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        fetchReceiver();
    }, [receiverId]);

    // Render loading state or error message
    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            {receiver && (
                <ChatBox
                    loggedInUserId={sender.$id}
                    receiverId={receiver.userId}
                    userName={receiverId}
                />
            )}
        </div>
    );
}

export default ChatPage;