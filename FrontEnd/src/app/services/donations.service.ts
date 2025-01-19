import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../schemas/api.schemas';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private _http: HttpClient) {}

  getDonations(): Observable<Donation[]> {
    return this._http.get<any[]>(environment.apiUrl + '/donations').pipe(
      map((donations: Donation[]) => {
        return donations.map((obj) => {
          console.log(obj)
          return {
            id: obj.id,
            id_pot: obj.id_pot,
            deposit_date: obj.deposit_date,
            crypto_type: obj.crypto_type,
            amount: obj.amount,
            code: obj.code,
            public_address: obj.public_address,
            transaction_id: obj.transaction_id,
            message: obj.message,
          };
        });
      })
    );
  }

  createDonation(donation: Donation): Observable<any> {
    return this._http.post(environment.apiUrl + '/donations', donation);
  }
}
