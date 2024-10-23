/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { CircleUserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button, Input, Loading } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
    addMessage,
    setError,
    setLoading,
    setMessages,
    } from "../store/chatSlice";
    import chatService from "../appwrite/chatConfig";

    function ChatBox({ loggedInUserId, receiverId, userName }) {
    const { register, handleSubmit, reset } = useForm();
    const messages = useSelector((state) => state.chat.messages);
    const loading = useSelector((state) => state.chat.loading);
    const error = useSelector((state) => state.chat.error);
    const dispatch = useDispatch();

    const messagesEndRef = useRef(null);

    // Scroll to the bottom when a new message arrives
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchData = async () => {
        console.log("ChatBox Rendered");

        if (loggedInUserId && receiverId) {
            dispatch(setLoading());
            try {
            const chat = await chatService.fetchChat({
                senderId: loggedInUserId.toString(),
                receiverId: receiverId.toString(),
            });
            if (chat?.documents?.length) {
                dispatch(setMessages(chat.documents));
            } else {
                dispatch(setError("No messages found"));
            }
            } catch (error) {
            dispatch(setError("Error Fetching Chat Messages"));
            }

            const unsubscribe = chatService.subscribeMessage(
            loggedInUserId,
            receiverId,
            (message) => {
                dispatch(addMessage(message));
                scrollToBottom(); // Scroll to the new message
            }
            );
            return () => {
            unsubscribe();
            };
        }
        };
        fetchData();
    }, [loggedInUserId, receiverId, dispatch]);

    const Send = async (data) => {
        const { message } = data;
        if (message) {
        try {
            await chatService.createChat({
            message,
            senderId: loggedInUserId.toString(),
            receiverId: receiverId.toString(),
            roomId: receiverId.toString(),
            timestamp: new Date().toISOString(),
            });
            reset();
            scrollToBottom(); // Scroll to the bottom after sending
        } catch (error) {
            console.error("Error in sending message:", error);
        }
        }
    };

    return (
        <div className="w-full h-[85vh] flex flex-col">
        {/* Chat Header */}
        <div className="px-5 py-3 mt-2 text-gray-600 text-lg align-center justify-center border-2 rounded-sm border-gray-600 font-semibold">
            {userName}
        </div>

        {/* Chat Messages Section with Fixed Height */}
        <div className="flex-grow h-0 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {loading &&
                    <div className="flex justify-center items-center h-screen">
                    <Loading type="cubes" color="purple" />
                    </div>
            }
            {error &&
                    <div className="flex justify-center items-center h-screen">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                        </div>
                    </div>
            }

            {messages.map((message) => (
            <div key={message.timestamp} className="flex">
                {message.senderId === loggedInUserId ? (
                <div className="ml-auto flex items-center space-x-3">
                    <div className="flex flex-col items-end">
                    <h5 className="text-right text-gray-600 text-sm">You</h5>
                    <div className="px-4 py-2 bg-purple-800 text-white rounded-lg shadow max-w-xs break-words">
                        {message.message}
                    </div>
                    <div className="text-gray-500 text-xs font-normal leading-4 py-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}
                    </div>
                    </div>
                    <CircleUserRound className="w-10 h-10 text-purple-800 self-start" />
                </div>
                ) : (
                <div className="mr-auto flex items-end space-x-2">
                    <CircleUserRound className="w-10 h-10 text-gray-600 self-start" />
                    <div className="flex flex-col">
                    <h5 className="text-gray-600 text-sm">Other</h5>
                    <div className="px-4 py-2 bg-gray-200 rounded-lg shadow">
                        {message.message}
                    </div>
                    <div className="text-gray-500 text-xs font-normal leading-4 py-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}
                    </div>
                    </div>
                </div>
                )}
            </div>
            ))}
            {/* Dummy div to ensure scroll-to-bottom works */}
            <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Section */}
        <div className="border border-gray-300 rounded-md p-4 flex items-center space-x-3 bg-white sticky bottom-0">
            <form
            onSubmit={handleSubmit(Send)}
            className="flex items-center w-full space-x-3"
            >
            <CircleUserRound className="w-10 h-10 text-purple-800" />
            <Input
                className="flex-grow border-none rounded-full py-2 px-4 text-sm"
                type="text"
                placeholder="Type a message..."
                {...register("message", { required: true })}
            />
            <Button
                className="bg-purple-800 text-white rounded-full px-4 py-2 text-sm font-semibold"
                type="submit"
            >
                Send
            </Button>
            </form>
        </div>
        </div>
    );
}

export default ChatBox;

{
  /* <div>
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
            </div> */
}
