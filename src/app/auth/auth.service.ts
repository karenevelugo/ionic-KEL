import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = 'karen';
  private _password ='karen14';

  constructor(private router: Router){

  }
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }
  get password() {
    return this._password;
  }

  login(email,password) {
    if(email === this._userId && password === this._password){
        this._userIsAuthenticated = true;
    }else{
        this._userIsAuthenticated = false;
    }
    
  }

  logout() {
    this._userIsAuthenticated = false;    
    this.router.navigateByUrl('/auth');
  }
}
