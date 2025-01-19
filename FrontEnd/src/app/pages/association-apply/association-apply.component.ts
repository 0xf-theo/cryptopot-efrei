import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-association-apply',
  templateUrl: './association-apply.component.html',
  styleUrls: ['./association-apply.component.scss'],
})
export class AssociationApplyComponent implements OnInit {
  form: FormGroup = this._fb.group({
    name: ['', Validators.required],
    first_name: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    acceptTerms: [false, this.mustAcceptTerms()],
  });

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const url = environment.apiUrl + '/users';
      const value: any = { ...this.form.value, role: '' };
      delete value['acceptTerms'];
      this._http.post(url, value).subscribe((res) => {
        console.log('Data saved successfully');
        this._router.navigate(['/apply/association']);
      });
    }
  }

  private mustAcceptTerms(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value);
      return !control.value ? { message: 'must accept' } : null;
    };
  }
}
