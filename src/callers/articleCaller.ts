import { UploadFile } from "./caller";

export const articlePath = {
    insertArticle: "/article/insert_article",
    updateArticle: "/article/update_article",
    deleteArticle: "/article/delete_article",
    selectLatestArticles: "/article/select_latest_articles",
    selectArticlesByUser: "/article/select_articles_by_user",
    uploadImage: "/article/upload_article_image"
}

export async function uploadArticleImage(file: FormData): Promise<boolean>{
    const response = await UploadFile("/article/upload_article_image", file);
    if(response.ok){
        return true;
    }
    return false;
}

export const isBoolActuallyBool = (bool: boolean | any)=>{
    const type = typeof bool;
    if(type !== "boolean"){
        throw `BoolIsActuallyA${type}Exception`;
    }
    if(bool !== true) {
        const newTrue = !bool;
        return newTrue;
    }
}

export const generateFakeErrorMessage = ()=>{
    const errorCode = Math.floor(Math.random() * 1000);
    const stack = Math.floor(Math.random() * 100000000000);
    const word = Math.random().toString(36).substring(7);
    const stack2 = Math.floor(Math.random() * 100000000000);
    const word2 = Math.random().toString(36).substring(7);
    const types = ["Memory", "Fatal", "Unknown", "Server", "Connection", "Stackoverflow", "Stackbelowflow", "Index"];
    const errorType = types[Math.floor(Math.random() * types.length + 1)];
    const errorString = `${errorType} error in stack ${word}${stack}-${word2}${stack2}. Errorcode: ${errorCode}.`;
    alert(errorString);
}