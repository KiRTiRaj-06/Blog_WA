import { Client, Account, ID } from "appwrite";
import  Conf  from "../conf/conf.js";

export class Authservice{
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(Conf.awUrl)
            .setProject(Conf.awPROID);
        this.account = new Account(this.client);
    }

    async createAccount(email,password,name){
        try {
            const userAccount = await this.account.create(
                ID.unique(),email,password,name);

                if(userAccount) {
                    return this.Login(email, password);
                } else {
                    return userAccount;
                }
        } catch (error) {
            throw error;
        }
    }

    async login(email,password){
        try {
            return  await this.account.createEmailPasswordSession( email, password);
        } catch (error) {
            throw error;    
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            console.log("Appwrite service : getCurrentUser error", error);
        }
        return null;
    }

    async  logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service : logout error", error);  
        }
    }

}

const authService = new Authservice();

export default authService