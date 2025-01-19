import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}
  onSubmit() {
    this._authService
      .forgotPassword(this.email)
      .subscribe((data) => console.log(data));
  }
}
