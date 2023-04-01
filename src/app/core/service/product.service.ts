import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.baseUrl + 'products';

  constructor(private httpClient: HttpClient) {}

  getAll(value:string): Observable<any> {
    return this.httpClient.get(this.url + '/all', {
      params:new HttpParams().
        append('value', value)
    });
  }
}
