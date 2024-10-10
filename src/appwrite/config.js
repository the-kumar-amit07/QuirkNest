
import conf from '../conf/conf.js'
import { Client,ID,Databases,Storage,Query} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //create Post
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(`Appwrite::createPost::error::${error}`);
        }
    }
    //update Post
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log(`Appwrite::updatePost::error::${error}`);
        }
    }
    //delete Post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(`Appwrite::deletePost::error::${error}`);
            return false;
        }
    }
    //get posts
    async getPosts(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(`Appwrite::getPost::error::${error}`);
            return false;
        }
    }
    //get all posts
    async getAllPosts(queries = [Query.equal("status","active"),Query.orderDesc('$createdAt')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(`Appwrite::getAllPost::error::${error}`);
        }
    }
    //get posts by logeed user
    async getUserPosts(userId, queries = [Query.equal("status","active"),Query.equal("userId",userId),Query.orderDesc('$createdAt')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(`Appwrite::getUserPosts::error::${error}`);
        }
    }

    // //get user from Document
    // async getPostUser(userId) {
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             userId,
    //         )
    //     } catch (error) {
    //         console.log(`Appwrite::getPostUser::error::${error}`);
    //         return null;
    //     }
    // }

    //fileUpload
    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(`Appwrite::uploadFile::error::${error}`);
        }
    }
    //delete File
    async deleteFile (fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log(`Appwrite::deleteFile::error::${error}`);
        }
    }
    //preview file
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}
const service = new Service();
export default service;