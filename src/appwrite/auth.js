import conf from "../conf/conf.js";
import { Client,Account,ID,Databases,Query } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client)
        console.log("Appwrite URL:", conf.appwriteUrl);
    }
    

    //create account
    async createAccount({ email, password, name }) {
        console.log(email, password, name);
        
        try {
            const existingUser = await this.searchByUsername(name)
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("new account Id",userAccount)
            if (userAccount) {
                const create = await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteUsersCollectionId,
                    userAccount.$id,
                    // ID.unique(),
                    {
                        userId: userAccount.$id,
                        username: name,
                        email: email,
                    }
                )
                console.log("create",create)
                //redirect to login
                return this.logIn({ email, password })
                
            }else{
                return userAccount
                
            }
        } catch (error) {
            console.log(`Appwrite::createAccount::error::${error}`);
        }
    }

    //login
    async logIn({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log(`Appwrite::logIn::error::${error}`);
        }
    }

    //current user
    async getCurrentUser () {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log(`Appwrite::getCurrentUser::error::${error}`);
        }
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(`Appwrite::logOut::error::${error}`);
        }
    }

    //Search by a username
    async searchByUsername(username) { 
        try {
            console.log("Searching for username:", username);
            const queries = [Query.equal("username", username)]
            const userRecord = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                queries,
            )
            console.log("Query Result:", userRecord); 
            if (userRecord.documents.length > 0) {
                console.log("User found:", userRecord.documents[0]);
                return userRecord.documents[0]
            } else {
                console.log("No user found");
                return null
            }
        }
        catch (error) {
            console.log(`Appwrite::searchByUsername::error::${error}`)
        }
    }


    //Follow user
    async followUser(followerId, followedId) {
        try { 
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteFollowsCollectionId,
                ID.unique(),
                {followerId, followedId}
            )
        }
        catch (error) {
            console.log(`Appwrite::followUser::error::${error}`)
        }
    }

    //Unfollow user
    async unfollowUser(followerId, followedId) {
        try { 
            const queries = [Query.equal("followerId", followerId), Query.equal("followedId", followedId)]
            const followRecord = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteFollowsCollectionId,
                queries
            )

            if (followRecord.documents.length > 0) {
                const followId = followRecord.documents[0].$id
                return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteFollowsCollectionId,
                    followId
                )
            }
        }
        catch (error) {
            console.log(`Appwrite::unfollowUser::error::${error}`)
        }
    }

    //Check following
    async isUserFollowing(followerId, followedId) {
        try { 
            const queries = [Query.equal("followerId", followerId), Query.equal("followedId", followedId)]
            const followRecord = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteFollowsCollectionId,
                queries
            )
            return followRecord.documents.length > 0
        }
        catch (error) {
            console.log(`Appwrite::isUserFollowing::error::${error}`);
        }
    }


}
const authService = new AuthService();
export default authService;
