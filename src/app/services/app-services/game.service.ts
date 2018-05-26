import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url: string = 'http://localhost:3000/api/games/';

  constructor(private http: HttpClient) {
  }

  create(game) {
    return this.http.post(this.url, game);
  }

  GetAll() {
    return this.http.get(this.url);
  }

  Get(gameId) {
    return this.http.get(this.url + gameId);
  }
  update(gameId, game) {
    return this.http.put(this.url + gameId, game)
  }

  delete(gameId) {
    return this.http.delete(this.url + gameId);
  }
}
