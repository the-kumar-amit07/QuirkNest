const conf ={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceApiKey:import.meta.env.VITE_TINYMCE_API_KEY
}
console.log("Appwrite URL:", conf.appwriteUrl);  // Debugging check
console.log("Project ID:", conf.appwriteProjectId);  // Debugging check
export default conf;