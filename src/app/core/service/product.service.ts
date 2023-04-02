import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../dto/ProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.baseUrl + 'products';

  constructor(private httpClient: HttpClient) {}

  create(productDTO:ProductDTO){
    return this.httpClient.post(this.url, productDTO);
  }

  update(productDTO:ProductDTO){
    return this.httpClient.put(this.url, productDTO);
  }

  getAll(value:string): Observable<any> {
    return this.httpClient.get(this.url + '/all', {
      params:new HttpParams().
        append('value', value)
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
}
