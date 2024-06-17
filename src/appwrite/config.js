import conf from '../conf.js'
import { Client,ID,Databases,Storage,Query } from 'appwrite'

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

            )
        } catch (error) {
            console.log();
        }
    }

}
const service = new Service();
export default service;