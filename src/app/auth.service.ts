import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000';
  public username: string;

  constructor(private http: Http, private router: Router) {
    if (this.isLoggedIn())
      this.username = localStorage.getItem('username');
  }

  login(credentials) {
    return this.http.post(this.url + '/token', credentials).pipe(map(response => {
      let result = response.json();
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        this.username = result.username;
        return true;
      }
      return false;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  get token() {
    return localStorage.getItem('token');
  }
}
