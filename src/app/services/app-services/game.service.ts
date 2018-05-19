import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  create(game) {
    return this.http.post(this.url + "/games", game);
  }
}
