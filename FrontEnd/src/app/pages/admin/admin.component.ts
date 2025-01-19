import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AssociationsService } from 'src/app/services/associations.service';
import { PotsService } from 'src/app/services/pots.service';
import { DonationService } from 'src/app/services/donations.service';
import { UserService } from 'src/app/services/user.service';
import { User, Pot, Donation, Association } from 'src/app/schemas/api.schemas';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  //selectedAssociation: Association = new Association();
  selectedAssociation: Association | null = null;
  selectedUser: User | null = null;
  selectedPots: Pot | null = null;
  newPots: any = {};

  constructor(
    public _authService: AuthService,
    private _associationService: AssociationsService,
    private _potsService: PotsService,
    private _donationsService: DonationService,
    private _usersService: UserService
  ) {
    this.associations = [];
    this.pots = [];
    this.donations = [];
    this.users = [];
  }

  associations: Association[];
  associations$: Observable<Association[]> =
    this._associationService.getAssociations();

  pots: Pot[];
  pots$: Observable<Pot[]> = this._potsService.getPots();

  donations: Donation[];
  donations$: Observable<Donation[]> = this._donationsService.getDonations();

  users: User[];
  users$: Observable<User[]> = this._usersService.getUser();

  editAssociation(association: Association) {
    this.selectedAssociation = Object.assign({}, association);
    // affecter les valeurs récupérées aux champs du formulaire
    (<HTMLInputElement>document.getElementById('name_asso')).value =
      this.selectedAssociation.name;
    (<HTMLInputElement>document.getElementById('rna')).value =
      this.selectedAssociation.rna;
    (<HTMLInputElement>document.getElementById('mail_asso')).value =
      this.selectedAssociation.mail;
    (<HTMLInputElement>document.getElementById('phone')).value =
      this.selectedAssociation.phone_number;
    (<HTMLInputElement>document.getElementById('adress')).value =
      this.selectedAssociation.adress;
    (<HTMLInputElement>document.getElementById('activity')).value =
      this.selectedAssociation.activity;
  }

  editMyAssociation() {
    const a = this.getMyAssociation();
    if (a) {
      this.editAssociation(a);
    }
  }

  getMyAssociation(): Association | undefined {
    return this.associations.find(
      (a) => a.id + '' == (this._authService.getUser()?.association || '')
    );
  }

  saveAssociation() {
    if (this.selectedAssociation) {
      const association = {
        id: this.selectedAssociation.id,
        name: (<HTMLInputElement>document.getElementById('name_asso')).value,
        mail: (<HTMLInputElement>document.getElementById('mail_asso')).value,
        phone_number: (<HTMLInputElement>document.getElementById('phone'))
          .value,
        adress: (<HTMLInputElement>document.getElementById('adress')).value,
        activity: (<HTMLInputElement>document.getElementById('activity')).value,
        rna: (<HTMLInputElement>document.getElementById('rna')).value,
      };

      this._associationService.updateAssociation(association).subscribe(() => {
        // Mettre à jour les données des associations affichées dans le tableau
        this.associations$.subscribe(
          (associations) => (this.associations = associations)
        );
        // Fermer la fenêtre modale
        const associationEditModal = document.getElementById(
          'associationEditModal'
        );
        if (associationEditModal) {
          associationEditModal.classList.replace('show', 'hide');
          //associationEditModal.classList.remove("d-block");
        }
      });
    }
  }

  deleteAssociation(associationId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette association?')) {
      this._associationService
        .deleteAssociation(associationId)
        .subscribe(() => {
          // Mettre à jour les données des associations affichées dans le tableau
          this.associations$.subscribe(
            (associations) => (this.associations = associations)
          );
        });
    }
  }

  editUser(user: User) {
    this.selectedUser = Object.assign({}, user);
    // affecter les valeurs récupérées aux champs du formulaire
    (<HTMLInputElement>document.getElementById('name')).value =
      this.selectedUser.name;
    (<HTMLInputElement>document.getElementById('first_name')).value =
      this.selectedUser.first_name;
    (<HTMLInputElement>document.getElementById('mail')).value =
      this.selectedUser.mail;
    (<HTMLInputElement>document.getElementById('roles')).value = JSON.stringify(
      this.selectedUser.roles
    );
  }

  saveUser() {
    if (this.selectedUser) {
      const user = {
        id: this.selectedUser.id,
        name: (<HTMLInputElement>document.getElementById('name')).value,
        first_name: (<HTMLInputElement>document.getElementById('first_name'))
          .value,
        mail: (<HTMLInputElement>document.getElementById('mail')).value,
        roles: JSON.parse(
          (<HTMLInputElement>document.getElementById('roles')).value
        ),
      };

      this._usersService.updateUser(user).subscribe(() => {
        // Mettre à jour les données des associations affichées dans le tableau
        this.users$.subscribe((users) => (this.users = users));
        // Fermer la fenêtre modale
        const userEditModal = document.getElementById('userEditModal');
        if (userEditModal) {
          userEditModal.classList.replace('show', 'hide');
          //associationEditModal.classList.remove("d-block");
        }
      });
    }
  }

  deleteUser(userId: number) {
    if (confirm('Do you really want to delete this user?')) {
      this._usersService.deleteUser(userId).subscribe(() => {
        // Mettre à jour les données des associations affichées dans le tableau
        this.users$.subscribe((users) => (this.users = users));
      });
    }
  }

  editPots(pots: Pot) {
    this.selectedPots = Object.assign({}, pots);
    // affecter les valeurs récupérées aux champs du formulaire
    (<HTMLInputElement>document.getElementById('name')).value =
      this.selectedPots.name;
    (<HTMLInputElement>document.getElementById('target_amount')).valueAsNumber =
      this.selectedPots.target_amount;
    (<HTMLInputElement>document.getElementById('description')).value =
      this.selectedPots.description;
  }

  savePots() {
    if (this.selectedPots) {
      const pots = {
        id: this.selectedPots.id,
        id_asso: this.selectedPots.id_asso,
        name: (<HTMLInputElement>document.getElementById('name')).value,
        target_amount: (<HTMLInputElement>(
          document.getElementById('target_amount')
        )).valueAsNumber,
        description: (<HTMLInputElement>document.getElementById('description'))
          .value,
        amount_paid: this.selectedPots.amount_paid,
        image: this.selectedPots.image,
        status: 'DRAFT',
      };

      this._potsService.updatePots(pots).subscribe(() => {
        // Mettre à jour les données des associations affichées dans le tableau
        this.pots$.subscribe((pots) => (this.pots = pots));
        // Fermer la fenêtre modale
        const potsEditModal = document.getElementById('potsEditModal');
        if (potsEditModal) {
          potsEditModal.classList.replace('show', 'hide');
          //associationEditModal.classList.remove("d-block");
        }
      });
    }
  }

  deletePot(potsId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette association?')) {
      this._potsService.deletePots(potsId).subscribe(() => {
        // Mettre à jour les données des associations affichées dans le tableau
        this.pots$.subscribe((pots) => (this.pots = pots));
      });
    }
  }

  createNewPots() {
    // Envoyer les données du formulaire à votre backend en utilisant HttpClient.post()
    this._potsService.createPot(this.newPots).subscribe(
      (response) => {
        console.log('Nouveau pots créé avec succès', response);
        location.reload();
      },
      (error) => {
        console.log('Erreur lors de la création du nouveau pots', error);
        alert('Erreur lors de la création du nouveau pots')
      }
    );
  }

  ngOnInit(): void {
    const loggedInUser = this._authService.getUser();
    const isAdmin = this._authService.isAdmin()
    this.associations$.subscribe((assos) => (this.associations = assos));
    this.pots$.subscribe((pot) => (this.pots = pot.filter(p => {
      return isAdmin || !isAdmin && p.id_asso === this.getMyAssociation()?.id
    })));
    this.users$.subscribe((user) => (this.users = user));
    this.donations$.subscribe((donation) => (this.donations = donation));
  }
}
