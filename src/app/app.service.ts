import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { loginCred } from "./models";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AppService
{

    private url: string = 'http://localhost:9798'; 

    constructor(private httpClient: HttpClient,private cookieService:CookieService)
    {

    }

    credentialsCheck(data:any)
    {
        return this.httpClient.post<Boolean>(this.url+"/loginChecks",data);
    }

    createAccount(data: any)
    {
        return this.httpClient.post<Boolean>(this.url+"/createAccount",data);
    }

    getUserPosts(data:any)
    {
        return this.httpClient.post<any>(this.url+"/userPosts",data);
    }

    getPostsById(data:any)
    {
        return this.httpClient.post<any>(this.url+"/getPostById",data);
    }

    uploadFile(formData: FormData)
    {
        return this.httpClient.post<Boolean>(this.url+"/uploadFile",formData);
    }

    updatePosts(data:any)
    {
        return this.httpClient.post<Boolean>(this.url+"/updatePosts",data);
    }

    savePosts(data:any)
    {
        return this.httpClient.post<Boolean>(this.url+"/savePosts",data);
    }

    getPublicPosts()
    {
        return this.httpClient.get<any>(this.url+"/getPublicPosts"); 
    }

    getPublicPostsById(data)
    {
        return this.httpClient.post<any>(this.url+"/getPublicPostsById",data)
    }

    downloadFiles(data)
    {
        return this.httpClient.get(this.url+"/downloadFiles?name="+data,{responseType: 'blob'});
    }

    getEmail(data)
    {
        return this.httpClient.post<any>(this.url+"/getEmail",data)
    }

    authService()
    {
        let getCookies = this.cookieService.get("username");

        if(getCookies)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    shareLogWithOthers(data)
    {
        return this.httpClient.post<any>(this.url+"/shareLogs",data)
    }

    convertbase64ToString(data)
    {
  
        // Encode the Buffer as a utf8 string
        let decodedString = atob(data);

        return decodedString;
    }

    getSharedIds(data)
    {
        return this.httpClient.post<any>(this.url+"/profileSharedLogIds",data)       
    }

    getAllPosts()
    {
        return this.httpClient.get<any>(this.url+"/getAllPosts")
    }

    getSharedPostsById(data)
    {
        return this.httpClient.post<any>(this.url+"/getSharedById",data)
    }

}