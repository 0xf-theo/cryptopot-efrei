import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pot } from '../schemas/api.schemas';
import { of } from 'rxjs';
import { AssociationsService } from '../services/associations.service';

@Injectable()
export class AssociationResolver implements Resolve<Observable<Pot>> {
  constructor(
    private _associationService: AssociationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pot | any> {
    const id = route.paramMap.get('id');

    if (id != null) {
      return this._associationService.getAssociation(id).pipe(
        map((res) => res),
        catchError((error: any) => {
          if (error.status === 404) {
            return of({ error: error });
          } else {
            return throwError(error);
          }
        })
      );
    }
    throw new Error('Id not found');
  }
}
