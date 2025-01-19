import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mail: string;
  password: string;

  constructor(private _authService: AuthService, private _route: Router) {
    this.mail = ' ';
    this.password = ' ';
  }

  ngOnInit(): void {}

  onSubmit() {
    this._authService
      .login(this.mail, this.password)
      .then(() => {
        alert('Vous etes connecté ! Vous allez être redirigé...');
        setTimeout(() => {
          this._route.navigate(['/']);
        }, 500);
      })
      .catch((e) => {
        console.log(e);
        alert(e.error.message || e.message);
      });
  }
}
