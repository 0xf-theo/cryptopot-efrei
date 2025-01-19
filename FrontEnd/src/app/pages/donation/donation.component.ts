import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Association, Pot } from 'src/app/schemas/api.schemas';
import { AssociationsService } from 'src/app/services/associations.service';
import { DonationService } from 'src/app/services/donations.service';
import { PotsService } from 'src/app/services/pots.service';
import { Web3Service } from 'src/app/services/web3.service';
import { environment } from 'src/environments/environment';
import ERC20 from 'src/app/abis/ERC20.json';

function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {
  donation: any;
  taxReceipt = 'no';
  loading: boolean = true;
  name?: string;
  contract?: string;
  error?: string;
  pot?: Pot;
  association?: Association;
  amount: number = 0;
  crowdfundingContract?: any;
  txs: any = [];
  message: string = '';
  code?: string;
  success: boolean = false;

  constructor(
    private _potsService: PotsService,
    private _associationsService: AssociationsService,
    private _donationService: DonationService,
    private _route: ActivatedRoute,
    public _web3Service: Web3Service
  ) {}

  onTaxReceiptChange() {
    if (this.taxReceipt === 'yes') {
      this.donation.emailInputRef = true;
    } else {
      this.donation.emailInputRef = false;
    }
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const { name, contract } = params;
      console.log({ name, contract });
      if (
        name != undefined &&
        contract != undefined &&
        name != '' &&
        contract != ''
      ) {
        this._potsService.getPots().subscribe((pots) => {
          const pot = pots.find((p) => p.contract_address === contract);

          if (pot) {
            this._associationsService
              .getAssociation(pot.id_asso + '')
              .subscribe((asso) => {
                if (asso) {
                  this.pot = pot;
                  this.association = asso;
                  this.loading = false;
                  this.name = name;
                  this.contract = contract;

                  this.crowdfundingContract =
                    this._web3Service.getCrowdfundingContract(
                      this.contract || ''
                    );
                } else {
                  this.error =
                    'An error occured with that pot: unknown association';
                  this.loading = false;
                }
              });
          } else {
            this.error =
              'This contract address is not linked to a pot hosted on CryptoPot';
            this.loading = false;
          }
        });
      } else {
        this.error = 'Bad link';
        this.loading = false;
      }
    });
  }

  donate() {
    if (this.amount == 0) {
      alert('Amount should be greater than 0 !');
      return;
    }

    const call = new Promise((resolve, reject) => {
      this._web3Service
        .getContract(environment.network.contracts.Usdc, ERC20.abi)
        ['balanceOf'](this._web3Service.getAccount())
        .then((a: any) => {
          const sold = Number(a) / 10 ** 18;

          if (this.amount <= sold) {
            this._web3Service
              .getAllowance(
                environment.network.contracts.Usdc,
                this.contract || ''
              )
              .then(async (a) => {
                if (Number(a) <= 10000) {
                  const tx = await this._web3Service.approve(
                    environment.network.contracts.Usdc,
                    this.contract || ''
                  );
                  this.txs.push({
                    hash: tx.hash,
                    name: 'Approve',
                    finished: false,
                  });
                  const receipt = await tx.wait();
                  this.txs = [
                    ...this.txs.filter(
                      (tx: any) => tx.hash != receipt.transactionHash
                    ),
                    { hash: tx.hash, name: 'Approve', finished: true },
                  ];
                  resolve(null);
                } else {
                  resolve(null);
                }
              });
          } else {
            alert("You don't have enought funds in your wallet !");
            reject();
          }
        });
    });

    call.then(() => {
      this.crowdfundingContract['contribute'](this.amount)
        .then(async (tx: any) => {
          this.txs.push({ hash: tx.hash, name: 'Contribute', finished: false });
          const receipt = await tx.wait();
          this.txs = [
            ...this.txs.filter((tx: any) => tx.hash != receipt.transactionHash),
            { hash: tx.hash, name: 'Contribute', finished: true },
          ];
          this.code = makeid(5);
          this._donationService
            .createDonation({
              id: 0,
              id_pot: this.pot?.id || 0,
              deposit_date: new Date().toDateString(),
              crypto_type: 'usdc',
              amount: this.amount + '',
              code: this.code,
              public_address: this._web3Service?.getAccount() || '',
              transaction_id: tx.hash,
              message: this.message,
            })
            .subscribe({
              next: (v) => {
                this.success = true;
              },
              error(e) {
                console.log(e);
                alert(e.message);
              },
            });
        })
        .catch((e: any) => console.log(e));
    });
  }

  hasRunningTransaction(): boolean {
    return this.txs.filter((tx: any) => !tx.finished).length > 0;
  }
}
