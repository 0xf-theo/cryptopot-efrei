import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/schemas/api.schemas';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  name: string = '';
  first_name = '';
  mail = '';
  password = '';
  confirm_password = '';

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    const tmp = this._authService.getUser();

    if (tmp != null) {
      console.log(tmp);
      this.name = tmp.name;
      this.first_name = tmp.first_name;
      this.mail = tmp.mail;
    }
  }

  updateProfile(e: any) {
    e.preventDefault();
    if (!this._authService.isLoggedIn()) {
      alert('You should be connected !');
      return;
    }

    if (this.mail == '' || this.first_name == '' || this.name == '') {
      alert('One or more inputs are missing !');
      return;
    }

    const user = this._authService.getUser();
    if (user) {
      const tmp: User = {
        ...user,
        name: this.name,
        first_name: this.first_name,
        mail: this.mail,
      };
      const service = this._authService;
      this._userService.updateUser(tmp).subscribe({
        next(v: any) {
          service.refresh();
          alert('Profile successfully updated !');
        },
        error(e) {
          console.log(e);
          alert('An error occured ! Please try again...');
        },
      });
    }
  }

  updatePassword(e: any) {
    e.preventDefault();

    if (!this._authService.isLoggedIn()) {
      alert('You should be connected !');
      return;
    }

    if (this.password != this.confirm_password) {
      alert("Password and confirmation aren't the same");
      return;
    }

    if (this.password.length < 4) {
      alert('Password should be more than 4 characters lenght');
      return;
    }

    const user = this._authService.getUser();
    if (user) {
      this._userService.updatePassword(user, this.password).subscribe({
        next(v: any) {
          console.log({ v });
          alert('Password successfully updated !');
        },
        error(e) {
          console.log(e);
          alert('An error occured ! Please try again...');
        },
      });
    }
  }

  logout() {
    this._authService.logout();
  }
}
