import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ContractComponent } from './components/contract/contract.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { SideBarComponent } from './partials/side-bar/side-bar.component';
import { HeaderBarComponent } from './partials/header-bar/header-bar.component';
import { ContractService } from './services/contract.service';
import { TokenInterceptor } from './interceptors/token';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  {
    path: 'admin',
    children: [
      { path: 'contract', component: ContractComponent }],
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ContractComponent,
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    HeaderBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    GuestGuard,
    AuthGuard,
    ContractService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
