const Conf = {
    awUrl: String(import.meta.env.VITE_APPWRITE_URL),
    awDBID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    awCOLLID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    awPROID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    awBUCID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    awDevK: String(import.meta.env.VITE_APPWRITE_DEV_KEY)
}

export default Conf