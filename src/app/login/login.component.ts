import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin: boolean = false;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn(credentials) {
    this.subscription = this.auth.login(credentials).subscribe(res => {
      if (res) {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      }
      else
        this.invalidLogin = true;
    }, (error) => {
      this.invalidLogin = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
