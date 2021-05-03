import { useRef } from "react";

const def: string = "/rewer/node";
export async function GETAsynch(url: string): Promise<Response>{
    const response = await fetch(def + url, {
        method: "GET",
        cache: "no-cache",
        credentials: "include"
    });
    return response;
}

export async function POSTAsynch(url: string, data: any){
    const response = await fetch(def + url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
    });
    if(response.ok){
        return response;
    } else {
        console.log(response);
        return response;
    }
}

export async function GETFromJsonDB(url: string): Promise<any>{
    const response = await fetch("/rewer/jsondb" + url, {
        method: "GET",
        cache: "no-cache",
        credentials: "include"
    });
    if(response.ok){
        return await response.json();
    }
    return null;
}

export async function UploadFile(url?: string, data?: FormData): Promise<Response>{
    const response = await fetch(def +url, {
        method: "POST",
        cache: 'no-cache',
        body: data
    });
    if(response.ok){
        return response;
    } else {
        console.log(response);
        return response;
    }
}

export enum ECallType{
    INSERT,
    ISOK,
    SELECT
}

export function usePOST(dataToSend?: any, path?: string, callType?: ECallType): [(newData?: any, newUrl?: any, newType?: ECallType)=> Promise<any>, AbortController]{
    const abortController = new AbortController();
    const data = useRef<any>(dataToSend);
    const url = useRef<string>(path);
    const type = useRef<ECallType>(callType ? callType : ECallType.SELECT);

    const fetchData = async (newData?: any,  newUrl?: string, newType?: ECallType)=>{
        if(newUrl) url.current = newUrl;
        if(newData) data.current = newData;
        if(newType != null) type.current = newType;
        try{
            return await postCall(data.current, url.current, type.current, abortController);
        } catch(err){
            console.log(err);
            return null;
        }
    }
    return [fetchData, abortController];
}

async function postCall(data: any, url: string, type: ECallType, abortController: AbortController){
        const response = await fetch(def + url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            signal: abortController.signal,
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
        });
        if(type === ECallType.INSERT) return await handleInsert(response);
        if(type === ECallType.SELECT) return await handleSelect(response);
        if(type === ECallType.ISOK) return handleIsOk(response);
        return null;
}

export function useGET(url?: string): [(newUrl?: string)=> Promise<any>, AbortController]{
    const abortController = new AbortController();
    const fetchData = async (newUrl = url)=>{
        if(newUrl) url = newUrl;
        try{
            return await getCall(url);
        } catch(err){
            console.log(err);
            return null;
        }
    }
    return [fetchData, abortController];
}

async function getCall(url: string): Promise<any>{
    const response = await fetch(def + url, {
        method: "GET",
        cache: "no-cache",
        credentials: "include"
    });
    if(response.ok){
        return await response.json();
    } 
    return null; 
}

export function uploadCaller(url: string, data: FormData): [(newUrl: string, newData: FormData)=> Promise<boolean>, AbortController]{
    const abortController = new AbortController();
    const fetchData = async (newUrl = url, newData = data)=>{
        if(newUrl) url = newUrl;
        if(newData) data = newData;
        try{
            return await uploadCall(url, data);
        } catch(err){
            console.log(err);
            return null;
        }
    }

    return [fetchData, abortController];
}

async function uploadCall(url: string, data: FormData): Promise<boolean>{
    const response = await fetch(def +url, {
        method: "POST",
        cache: 'no-cache',
        body: data
    });
    if(response.ok){
        return true;
    }
}

async function handleSelect(response: Response): Promise<any>{
    if(response.ok){
        return await response.json();
    }
    return null;
}

async function handleInsert(response: Response): Promise<number | null>{
    if(response.ok){
        return (await response.json()).newId;
    }
    return null;
}

function handleIsOk(response: Response): boolean{
    if(response.ok){
        return true;
    }
    return false;
}

export interface IRequestInfo{
    url: string;
    data: any;
}

export function IsSuccessful(json: string){
    if(JSON.parse(json).msg === "success"){
        return true;
    }
    console.log(json);
    return false;
}

export function isResponse200(response: string){
    try{
        if(JSON.parse(response).response === 200) return true;
    } catch(err){
        console.log(err);
        console.log(response);
    }
}

export function tryParse(response: string){
    try{
        return JSON.parse(response).object;
    }catch(err) {
        console.log(err);
        console.log(response);
    }
    return null;
}

export function getNewId(object: any, response: string){
    try{
        object.id = JSON.parse(response).newId;
        if(object.id != null) return true;
        console.log(response);
    } catch(err){
        console.log(err);
        console.log(response);
    }
    return false;
}

export function parseId(response: string): number{
    try{
        return JSON.parse(response).newId;
    } catch(err){
        console.log(err);
        console.log(response);
    }
    return null;
}
