import { Cateogry } from './../../models/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = 'http://localhost:3000/api/categories/';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get(this.url);
  }

  Get(id) {
    return this.http.get(this.url + id);
  }

  Create(cateogry) {
    return this.http.post(this.url, cateogry);
  }

  Update(id, category) {
    return this.http.put(this.url + id, category);
  }

  Delete(id) {
    return this.http.delete(this.url + id);
  }
}
