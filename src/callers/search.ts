import { POSTAsynch } from "./caller";
import { ISearchResult } from "../../common/search"
export async function mainSearch(keyword: string, limit: number): Promise<ISearchResult | null>{
    const response = await POSTAsynch("/search", { keyword: keyword, limit: limit});
    if(response.ok){
        return await response.json();
    }
    return null;
}

export const searchPath = {
    search: "/search",
    autoComplete: "/auto-complete"
}
