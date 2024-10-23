/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatBox, Loading } from "../components";
import { useParams } from "react-router-dom";

function ChatPage() {
    const userData = useSelector((state) => state.auth.userData);
    console.log("currentUser:", userData);
    console.log("currentUser$Id:", userData.$id);
    const { receiverId } = useParams();
    console.log("Receiver ID from URL params:", receiverId);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
        if (userData && receiverId) {
            setLoading(false);
        } else {
            setError(
            "Unable to load chat. Please check your connection or the user data."
            );
            setLoading(false);
        }
        }, 1000);
    }, [userData, receiverId]);

    if (error)
        return (
        <div className="flex justify-center items-center h-screen">
            <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
            >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            </div>
        </div>
        );

    return (
        <div>
        {loading ? (
            <div className="flex justify-center items-center h-screen">
            <Loading type="cubes" color="purple" />
            </div>
        ) : (
            <ChatBox
            loggedInUserId={userData.$id}
            receiverId={receiverId}
            userName={receiverId}
            />
        )}
        </div>
    );
}

export default ChatPage;
