import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  @Input() title = '';
  @Input() background =
    'https://html.storebuild.shop/donacion/donacion/assets/img/bg/breadcrum_bg_2.jpg';

  constructor() {}

  ngOnInit(): void {}
}
