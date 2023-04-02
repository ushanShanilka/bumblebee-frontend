import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandsDTO} from "../dto/BrandsDTO";
import {CategoryDTO} from "../dto/CategoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.baseUrl + 'category';

  constructor(private httpClient: HttpClient) {}

  getAll(status:string): Observable<any> {
    return this.httpClient.get(this.url + '/all', {
      params:new HttpParams().
      append('status', status)
    });
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

  create(dto:CategoryDTO){
    return this.httpClient.post(this.url, dto);
  }

  update(dto:CategoryDTO){
    return this.httpClient.put(this.url, dto);
  }
}
