import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductDTO} from "../dto/ProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  url = environment.baseUrl + 'images';

  constructor(private httpClient: HttpClient) {}

  delete(id:number){
    return this.httpClient.delete(this.url, {
      params:new HttpParams().
        append("id", id)
    });
  }
}
