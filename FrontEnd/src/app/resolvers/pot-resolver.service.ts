import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, forkJoin, map, mergeMap, Observable, switchMap, throwError } from 'rxjs';
import { Pot } from '../schemas/api.schemas';
import { Association } from '../schemas/api.schemas';
import { PotsService } from '../services/pots.service';
import { of } from 'rxjs';
import { AssociationsService } from '../services/associations.service';

@Injectable()
export class PotResolver implements Resolve<Observable<Pot>> {
  constructor(private _potsService: PotsService, private _assosService: AssociationsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pot | any> {
    const id = route.paramMap.get('id');

    if (id != null) {
      let potResult: Pot;
      return this._potsService.getPot(id).pipe(
        switchMap((pot: Pot) => {
          return forkJoin([this._assosService.getAssociation(pot.id_asso.toString()), of(pot)])
        }),
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
