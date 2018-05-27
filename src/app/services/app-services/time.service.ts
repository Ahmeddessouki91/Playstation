import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private url = "http://localhost:3000/api/times/";

  constructor(private http: HttpClient) { }

  create(time) {
    return this.http.post(this.url, time);
  }

  GetAll() {
    return this.http.get(this.url);
  }

  Get(timeId) {
    return this.http.get(this.url + timeId);
  }
  
  update(timeId, time) {
    return this.http.put(this.url + timeId, time)
  }

  delete(timeId) {
    return this.http.delete(this.url + timeId);
  }
}
