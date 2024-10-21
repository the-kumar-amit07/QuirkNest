/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "./index";
import authService from '../appwrite/auth';
import chatService from '../appwrite/chatConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setError, setLoading, setMessages } from '../store/chatSlice';

function ChatBox({ loggedInUserId, receiverId }) {
    console.log("ChatBox component rendered")
    const { register, handleSubmit, reset } = useForm()
    const messages = useSelector((state) => state.chat.messages)
    const loading = useSelector((state) => state.chat.loading)
    const error = useSelector((state)=>state.chat.error)
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchData = async () => {
            console.log("loggedInUserId:", loggedInUserId);
            console.log("receiverId:",receiverId)
            if (loggedInUserId && receiverId) {
                console.log("Setting loading state...");
                dispatch(setLoading());
                try {
                    const chat = await chatService.fetchChat({
                        senderId : loggedInUserId.toString(),
                        receiverId:receiverId.toString(),
                    })
                    console.log("Fetched chat data:", chat); 
                    if (chat?.documents?.length) {
                        dispatch(setMessages(chat.documents))
                    } else {
                        dispatch(setError("No messages found"))
                        console.log("No message found");
                    }
                } catch (error) {
                    dispatch(setError("Error Fetching Chat Messages"))
                    console.log(error);
                }
                console.log("Subscribing with IDs - Sender:", loggedInUserId, "Receiver:", receiverId);
                const unsubscribe = chatService.subscribeMessage(loggedInUserId, receiverId, (message) => {
                    console.log("New message received:", message);
                    dispatch(addMessage(message));
                });
                return () => {
                    console.log("Unsubscribing from real-time messages...");
                    unsubscribe()
                }
            }
        }
        fetchData()
    },[loggedInUserId,receiverId,dispatch])

    const Send = async (data) => {
        const { message } = data;
        if (message) {
            console.log("message:", message);
            try {
                // Convert IDs to strings here
                await chatService.createChat({
                    message,
                    senderId: loggedInUserId.toString(),  // Convert to string
                    receiverId: receiverId.toString(),    // Convert to string
                    roomId: receiverId.toString(),        // Convert to string
                    timestamp: new Date().toISOString()
                });
                reset();
            } catch (error) {
                console.error("Error in sending message:", error);
            }
        }
    }

    return (
        <div>
            <div>
                <h1>Chat with {receiverId}</h1>
                {loading && <p>loading messeges.....</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    {messages.map((message) => (
                        <div key={message.timestamp}>
                            <b>{message.senderId === loggedInUserId ? "You" : "Other"}:</b>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(Send)} >
                <Input
                        type="text"
                        placeholder="Type a message...."
                        {...register("message",{required:true})}
                    />
                    <Button
                        type="submit"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox;