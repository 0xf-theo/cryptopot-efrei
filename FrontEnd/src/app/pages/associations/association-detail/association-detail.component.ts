import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Association, Pot } from 'src/app/schemas/api.schemas';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.scss'],
})
export class AssociationDetailComponent implements OnInit {
  association: Association | null = null;
  pots: Pot[] = []

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: any) => {
      if (data.error || data.message.error) {
        this._router.navigate(['/404']);
      } else {
        this.association = data.message;
      }
    });
  }
}
