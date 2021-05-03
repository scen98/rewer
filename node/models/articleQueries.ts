import { IArticle } from "../../common/article";

export async function selectArticlesByUserQuery(conn, userName: string, keyword: string, limit: number, offset: number): Promise<IArticle[]>{
    const result = await conn.query("SELECT * FROM articles WHERE articles.userName = ? AND title LIKE CONCAT('%',?,'%') ORDER BY id DESC LIMIT ? OFFSET ?", [userName, keyword, limit, offset]);
    return result[0];
}

export async function insertArticleQuery(conn, article: IArticle): Promise<number | null>{
    const result = await conn.query("INSERT INTO articles (title, userName, text, publishDate) VALUES (?, ?, ?, ?);", [article.title, article.userName, article.text, article.publishDate]);
    if(result[0].insertId > 0) return result[0].insertId;
    return null;
}

export async function updateArticleQuery(conn, article: IArticle): Promise<boolean>{
    const result = await conn.query("UPDATE articles SET title = ?, text = ?, publishDate = ?, readMore = ? WHERE id = ?", [article.title, article.text, article.publishDate, article.readMore, article.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function deleteArticleQuery(conn, id: number, userName: string): Promise<boolean>{
    const result = await conn.query("DELETE FROM articles WHERE id = ? AND userName = ?", [id, userName]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectLatestArticlesQuery(conn, keyword: string, limit: number, offset: number): Promise<IArticle[]>{
    const today = new Date().toISOString();
    const result = await conn.query("SELECT * FROM articles WHERE publishDate <= ? AND title LIKE CONCAT('%',?,'%') ORDER BY publishDate DESC LIMIT ? OFFSET ?", [today, keyword, limit, offset]);
    return result[0];
}