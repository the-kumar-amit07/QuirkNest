/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from "../conf.js";
import { Client,Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //create account
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount){
                //redirect to login
                return this.logIn({email,password})
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
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log(`Appwrite::logIn::error::${error}`);
        }
    }

    //current user
    async getCurrentUser () {
        try {
            return await this.account.get();
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
}
const authService = new AuthService();
export default authService;
