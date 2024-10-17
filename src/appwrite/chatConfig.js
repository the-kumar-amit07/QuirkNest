import conf from "../conf/conf.js";
import { Client,Databases,ID,Query,Realtime } from "appwrite";

export class ChatService{
    client = new Client;
    databases;
    realtime;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.realtime = new Realtime(this.client);
    }

    //create Chat
    async createChat({ senderId,message,timestamp = Date.now() ,roomId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                ID.unique(),
                {
                    senderId,
                    message,
                    timestamp,
                    roomId,
                }
            )
        } catch (error) {
            console.log(`Appwrite::createChat::error::${error}`);
            
        }
    }

    //fetch Chat
    async fetchChat({ senderId, receiverId }) {
        const queries = [
            Query.or(
                Query.and(Query.equal("senderId", senderId), Query.equal("receiverId", receiverId)), 
                Query.and(Query.equal("senderId", receiverId), Query.equal("receiverId", senderId))  
            )
        ];
        
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteChatCollectionId,
                queries
            )
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
    subscribeMessage(senderId,receiverId) {
        const subscription = this.realtime.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteChatCollectionId}.documents`,
            (response) => {
                const message = response.payload
                if (response.event === 'databases.*.collections.*.documents.create') 
                {
                    if ((message.senderId === senderId && message.receiverId === receiverId)||(message.senderId === receiverId && message.receiverId === senderId)) {
                        console.log('New message received:', message);
                        
                    }
                }
                else if (response.event === "databases.*.collections.*.documents.update") {
                    console.log("message updated", message);
                }
                else if (response.event === "databases.*.collections.*.documents.delete") {
                    console.log("message deleted", message);
                }
            }
        )
        return subscription
    }

}