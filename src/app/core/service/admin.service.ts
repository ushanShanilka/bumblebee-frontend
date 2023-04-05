import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminDTO} from "../dto/AdminDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = environment.baseUrl + 'admins';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.url + '/all', {});
  }

  getById(id:number):Promise<any>{
    return new Promise(((resolve, reject) => {
      this.httpClient.get(this.url, {
        params:new HttpParams().append("id", id)
      }).toPromise().then(res => {
        resolve(res)
      }, msg => {
        reject(msg)
      })
    }))
  }

  update(adminDTO:AdminDTO): Observable<any> {
    console.log(typeof adminDTO)
    return this.httpClient.put(this.url, adminDTO);
  }
}
