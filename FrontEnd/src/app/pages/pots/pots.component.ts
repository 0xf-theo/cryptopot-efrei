import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pot } from 'src/app/schemas/api.schemas';
import { PotsService } from 'src/app/services/pots.service';

@Component({
  selector: 'app-pots',
  templateUrl: './pots.component.html',
  styleUrls: ['./pots.component.scss'],
})
export class PotsComponent implements OnInit {
  pots$: Observable<Pot[]> = this._potsService.getPots();

  constructor(private _potsService: PotsService) {}

  ngOnInit(): void {}
}
