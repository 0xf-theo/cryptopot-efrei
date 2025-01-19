import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Association } from '../schemas/api.schemas';

@Injectable({
  providedIn: 'root',
})
export class AssociationsService {
  constructor(private _http: HttpClient) {}

  getAssociations(): Observable<Association[]> {
    return this._http.get<any[]>(environment.apiUrl + '/associations').pipe(
      map((associations: Association[]) => {
        return associations.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            mail: obj.mail,
            phone_number: obj.phone_number,
            adress: obj.adress,
            activity: obj.activity,
            rna: obj.rna,
            image: obj.image,
            description: obj.description,
            website_link: obj.website_link,
          };
        });
      })
    );
  }

  getAssociation(id: string): Observable<any> {
    return this._http.get<any[]>(environment.apiUrl + '/associations/' + id);
  }

  updateAssociation(association: Association): Observable<any> {
    return this._http.put(
      environment.apiUrl + '/api/associations/' + association.id,
      association
    );
  }

  deleteAssociation(id: number): Observable<unknown> {
    return this._http.delete(environment.apiUrl + '/api/associations/' + id);
  }
}
