import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private _userService: UserService) {}

  onSubmit(form: NgForm) {
    const user = form.value;
    this._userService.registerUser(user).subscribe();
  }
}
