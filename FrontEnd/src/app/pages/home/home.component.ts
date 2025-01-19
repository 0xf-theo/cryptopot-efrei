import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Pot, Association } from 'src/app/schemas/api.schemas';
import { PotsService } from 'src/app/services/pots.service';
import { AssociationsService } from 'src/app/services/associations.service';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalRaisedFunds: number;

  constructor(
    private _authService: AuthService,
    private _potsService: PotsService,
    private _associationsService: AssociationsService
  ) {
    this.totalRaisedFunds = 0;
  }

  // Récupération des pots & associations
  pots$: Observable<Pot[]> = this._potsService.getPots();
  assos$: Observable<Association[]> =
    this._associationsService.getAssociations();

  ngOnInit(): void {
    $('.video_play, .play_btn, .video_icon').magnificPopup({
      type: 'iframe',
    });

    this.pots$.subscribe((pots) => {
      this.totalRaisedFunds = pots.reduce(
        (total, current) => total + current.amount_paid,
        0
      );
    });

    new Swiper('.support_images_active', {
      slidesPerView: 1,
      spaceBetween: 30,
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination-join',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      breakpoints: {
        350: {
          slidesPerView: 1,
        },
        550: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      },
    });

    new Swiper('.cause_container_active', {
      slidesPerView: 1,
      spaceBetween: 30,
      observer: true,
      observeParents: true,
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }
  logout() {
    this._authService.logout();
  }
}
