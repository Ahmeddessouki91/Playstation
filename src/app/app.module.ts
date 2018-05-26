import { GameService } from './services/app-services/game.service';
import { CategoryService } from './services/app-services/category.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGamesComponent } from './admin/admin-games/admin-games.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { GameFormComponent } from './admin/game-form/game-form.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { TimerComponent } from './timer/timer.component';
import { LimitTimeComponent } from './popups/limit-time/limit-time.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    AdminGamesComponent,
    AdminCategoriesComponent,
    GameFormComponent,
    CategoryFormComponent,
    TimerComponent,
    LimitTimeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'admin/games/new', component: GameFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/games/:id', component: GameFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/games', component: AdminGamesComponent, canActivate: [AuthGuard] },
      { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AuthGuard] },
    ]),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  providers: [
    AuthService, AuthGuard, CategoryService, GameService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [CategoryFormComponent,LimitTimeComponent,GameFormComponent]
})
export class AppModule { }
