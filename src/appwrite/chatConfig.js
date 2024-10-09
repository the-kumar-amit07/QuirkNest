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
    async createChat({ senderId,message,timestamp,roomId }) {
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
    async fetchChat({ senderId, reciverId }) {
        const queries = [Query.or(
            Query.and(Query.equal("senderId",senderId),Query.equal("reciverId",reciverId)),
            Query.and(Query.equal("senderId",reciverId),Query.equal("reciverId",senderId)),
        )]
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
    async updateChat(messageId, { senderId, message, timestamp, roomId }) {
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
    async subscribeMessage() {
        
    }

}