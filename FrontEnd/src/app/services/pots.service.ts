import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Pot } from '../schemas/api.schemas';
@Injectable({
  providedIn: 'root',
})
export class PotsService {
  constructor(private _http: HttpClient) {}

  getPots(): Observable<Pot[]> {
    return this._http.get<any[]>(environment.apiUrl + '/pots').pipe(
      map((pots: Pot[]) => {
        return pots.map((pot) => {
          return {
            id: pot.id,
            id_asso: pot.id_asso,
            name: pot.name,
            amount_paid: pot.amount_paid,
            target_amount: pot.target_amount,
            description: pot.description,
            image: pot.image || 'assets/img/causes/cause1.jpg',
            status: pot.status || 'DRAFT',
            contract_address: pot.contract_address,
          };
        });
      })
    );
  }

  getPot(id: string): Observable<any> {
    return this._http.get<any[]>(environment.apiUrl + '/pots/' + id);
  }

  /*getPotsByUser(userId: number) {
    return this._http.get<any[]>(environment.apiUrl + '/pots/${id}' + '/id_user'+  '==' + userId);
  }
  */
  //Pour recuperer juste un id, il faut une route ? ou faut que je fasse une recherche par rapport au pots/id ?

  createPot(pot: Pot): Observable<any> {
    return this._http.post(environment.apiUrl + '/api/pots', {
      ...pot,
      id_asso: Number(pot.id_asso),
      status: 'DRAFT',
      amount_paid: 0
    });
  }

  updatePots(pots: Pot): Observable<any> {
    console.log('ce que on va envoyer: ', pots.id, pots.description);
    return this._http.put(environment.apiUrl + '/api/pots/' + pots.id, pots);
  }

  deletePots(id: number): Observable<unknown> {
    return this._http.delete(environment.apiUrl + '/api/pots/' + id);
  }
}
