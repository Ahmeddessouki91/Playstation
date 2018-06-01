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

  GetAll(query) {
    return this.http.get(this.url + "?filter=" + query);
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

  formatTime(diffTime) {
    let hours = Math.round((diffTime / 60));
    let minutes = Math.round(((diffTime / 60) % 1) * 60);

    return ((hours <= 9) ? ("0" + hours) : hours) + ":" + ((minutes <= 9) ? ("0" + minutes) : minutes); // minutes
  }

  diff_min(dt2: any, dt1: any) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.round(diff /= 60);
  }
}
