import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.scss'],
})
export class HeaderLinkComponent implements OnInit {
  @Input() to = '#';
  @Input() subLinks = false;

  constructor() {}

  ngOnInit(): void {}
}
