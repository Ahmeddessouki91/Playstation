import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = 'http://localhost:3000/api';
  constructor(private http:HttpClient) {
   }

   getCategories(){
     return this.http.get(this.url + "/categories");
   }
}
