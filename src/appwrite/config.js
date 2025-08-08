import  Conf from "../conf/conf.js";
import { Client, Databases , ID,Storage,Query } from "appwrite";

export class DBService{
    client = new Client();
    databases;
    bucket;

        constructor(){
            this.client
                .setEndpoint(Conf.awUrl)
                .setProject(Conf.awPROID);
            this.databases = new Databases(this.client);
                this.bucket = new Storage(this.client);
        }
        
        async createPost(title, content, slug, userId,featuredImage,status) {
            try {
                return    await this.databases.createDocument(
                    Conf.awDBID,
                    Conf.awCOLLID,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                )
            } catch (error) {
                console.error("Error creating post:", error);
            }
        }

        async updatePost(slug,{title, content, featuredImage, status}) {
            try {
                await this.databases.updateDocument(
                    Conf.awDBID,
                    Conf.awCOLLID,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )
            } catch (error) {
                console.error("Error updating post:", error);
            }

        }

        async deletePost(slug) {
            try {
                return await this.databases.deleteDocument(
                    Conf.awDBID,
                    Conf.awCOLLID,
                    slug
                )
                return true;
            } catch (error) {
                console.error("Error deleting post:", error);
                return false;
            }
        }

        async getPost(slug) {
            try {
                return await this.databases.getDocument(
                    Conf.awDBID,
                    Conf.awCOLLID,
                    slug
                )
            } catch (error) {
                console.error("Error fetching post:", error);
                return false
            }
        }

        async getAllPosts(queries = [Query.equal('status','active')]){
            try {
                return await this.databases.listDocuments(
                    Conf.awDBID,
                    Conf.awCOLLID,
                    queries
                )
            } catch (error) {
                console.log("Error getting all posts :",error)
            }
        }

        // FILE UPLOAD

        async uploadFile(file){
            try {
                return await this.Bucket.createFile(
                    Conf.awBUCID,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Error uploading file ",error)
                return false;
            }
        }

        async deleteFile(fileId){
            try {
                return await this.Bucket.deleteFile(
                    Conf.awBUCID,
                    fileId
                )
                return true;
            } catch (error) {
                console.log("Error deleting file :", error)
            }
        }

        getFilePreview(fileId){
            return this.Bucket.getFilePreview(
                Conf.awBUCID,
                fileId
            )
        }

}

const dbService = new DBService();
export default dbService;