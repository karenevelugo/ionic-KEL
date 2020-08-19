import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin= false;
  isLoading=false;
  constructor(private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }
  onLogin(form) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email,password);
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();        
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigate(['/pokemon']);
        }, 1500); 
      });
  }
  

}
