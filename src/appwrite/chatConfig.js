import conf from "../conf/conf.js";
import { Client, Databases, ID, Query } from "appwrite";

export class ChatService{
    client = new Client;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }
    

    //create Chat
    async createChat({ senderId,receiverId,message,timestamp = Date.now(),roomId }) {
        try {
            const create = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                ID.unique(),
                {
                    senderId,
                    receiverId,
                    message,
                    timestamp,
                    roomId,
                }
            )
            console.log("Create:",create);
            return create
        } catch (error) {
            console.log(`Appwrite::createChat::error::${error}`);
            
        }
    }

    //fetch Chat
    async fetchChat({ senderId, receiverId }) {
        if (!senderId || !receiverId) {
            throw new Error("Both senderId and receiverId are required");
        }
        const senderIdStr = senderId.toString();
        const receiverIdStr = receiverId.toString();
    
        // console.log("senderId:", senderIdStr);  
        // console.log("receiverId:", receiverIdStr); 
    
        const queries = [
            Query.or(
                [
                    Query.and([Query.equal("senderId", senderIdStr), Query.equal("receiverId", receiverIdStr)]),
                    Query.and([Query.equal("senderId", receiverIdStr), Query.equal("receiverId", senderIdStr)])
                ]
            )
        ];
        console.log("Query:",queries);
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                queries
            )
            console.log("Result:",result);
            return result;
        } catch (error) {
            console.log(`Appwrite::fetchChat::error::${error}`);
            
        }
    }

    //delete Chat
    async deleteChat(messageId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                messageId
            )
            return true
        } catch (error) {
            console.log(`Appwrite::deleteChat::error::${error}`);
            return false
        }
    }

    //update Chat
    async updateChat(messageId, { senderId, message, timestamp = Date.now() ,roomId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                messageId, {
                    senderId,
                    message,
                    timestamp,
                    roomId
                }
            )
        } catch (error) {
            console.log(`Appwrite::updateChat::error::${error}`);
        }
    }

    //SUbscribe the realtime for neew messages
    subscribeMessage(senderId, receiverId, callback) {
        const subscription = this.client.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteChatCollectionId}.documents`,
            (response) => {
                const message = response.payload;
                console.log("Message received in real-time:", message);
                console.log("Full response:", response);
                console.log("Events array:", response.events); // Log events array
    
                // Check if the 'create' event is present in the events array
                const isCreateEvent = response.events.some(event => event.includes('databases.*.collections.*.documents.create'));
    
                if (isCreateEvent) {
                    console.log("Comparing IDs - Sender in Message:", message.senderId, "Receiver in Message:", message.receiverId);
                    console.log("Subscribed Sender ID:", senderId, "Subscribed Receiver ID:", receiverId);
    
                    if (
                        (message.senderId === senderId && message.receiverId === receiverId) ||
                        (message.senderId === receiverId && message.receiverId === senderId)
                    ) {
                        callback(message); // Trigger the callback for the new message
                    }
                } else {
                    console.log("Event is not a document creation event.");
                }
            }
        );
        return subscription;
    }

}

const chatService = new ChatService();
export default chatService;