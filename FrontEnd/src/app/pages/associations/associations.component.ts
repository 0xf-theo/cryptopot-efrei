import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Association } from 'src/app/schemas/api.schemas';
import { AssociationsService } from 'src/app/services/associations.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss'],
})
export class AssociationsComponent implements OnInit {
  associations$: Observable<Association[]> =
    this._associationService.getAssociations();

  constructor(private _associationService: AssociationsService) {}

  ngOnInit(): void {}
}
