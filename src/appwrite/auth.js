
import conf from "../conf/conf.js";
import { Client,Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        console.log("Appwrite URL:", conf.appwriteUrl);
    }

    //create account
    async createAccount({ email, password, name }) {
        console.log(email,password,name);
        
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
}
const authService = new AuthService();
export default authService;
