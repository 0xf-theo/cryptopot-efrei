import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-association-info',
  templateUrl: './association-info.component.html',
  styleUrls: ['./association-info.component.scss'],
})
export class AssociationInfoComponent implements OnInit {
  formData = {
    name: '',
    mail: '',
    phone_number: '',
    address: '',
    activity: '',
    rna: '',
  };
  constructor(private http: HttpClient, private _route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const url = environment.apiUrl + '/c-associations';
    this.http.post(url, this.formData).subscribe(
      (res) => {
        console.log('Data saved successfully');
        alert('Association créée, redirection...');
        setTimeout(() => {
          this._route.navigate(['/login']);
        }, 500);

        // Réinitialiser les valeurs du formulaire
        this.formData = {
          name: '',
          mail: '',
          phone_number: '',
          address: '',
          activity: '',
          rna: '',
        };
      },
      (err) => {
        alert("Il semblerait qu'une association possède déjà ce numéro de téléphone")
      }
    );
  }
}
