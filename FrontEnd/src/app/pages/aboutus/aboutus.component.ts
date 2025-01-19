import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('.video_play, .play_btn, .video_icon').magnificPopup({
      type: 'iframe',
    });
  }
}
