import { Component, OnInit } from '@angular/core';
import { Donation, Pot } from 'src/app/schemas/api.schemas';
import { ActivatedRoute, Router } from '@angular/router';
import { Association } from 'src/app/schemas/api.schemas';
import { switchMap, tap } from 'rxjs';
import { DonationService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  pot: Pot | null = null;
  association: Association | null = null;
  transactions: Donation[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _donationsService: DonationService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: any) => {
      console.log(data);
      if (data.error || data.message.error) {
        this._router.navigate(['/404']);
      } else {
        this.pot = data.message[1];
        this.association = data.message[0];

        this._donationsService
          .getDonations()
          .subscribe((donations) => (this.transactions = donations.filter(d => d.id_pot === this.pot?.id).sort((a: any, b: any) => b.amount - a.amount)));
      }
    });
  }
}
