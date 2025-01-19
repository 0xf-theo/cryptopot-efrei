import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../schemas/api.schemas';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = environment.apiUrl + '/users';

  constructor(private _http: HttpClient) {}

  registerUser(user: any) {
    return this._http.post<any>(this.apiURL, user);
  }

  getUser(): Observable<User[]> {
    return this._http.get<any[]>(environment.apiUrl + '/api/users').pipe(
      map((users: User[]) => {
        return users.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            first_name: obj.first_name,
            mail: obj.mail,
            roles: obj.roles || ['ROLE_USER'],
            association: obj.association
          };
        });
      })
    );
  }

  updateUser(user: User): Observable<any> {
    console.log('ce que on va envoyer: ', user.id, user.name);
    return this._http.put(environment.apiUrl + '/api/users/' + user.id, user);
  }

  updatePassword(user: User, password: string): Observable<any> {
    const tmp: any = { ...user };
    tmp.password = password;
    return this._http.put(environment.apiUrl + '/api/users/' + user.id, tmp);
  }

  deleteUser(id: number): Observable<unknown> {
    return this._http.delete(environment.apiUrl + '/api/users/' + id);
  }
}
