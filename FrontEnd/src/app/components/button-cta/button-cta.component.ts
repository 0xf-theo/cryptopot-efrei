import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-cta',
  templateUrl: './button-cta.component.html',
  styleUrls: ['./button-cta.component.scss']
})
export class ButtonCtaComponent implements OnInit {

  @Input() to = '#'

  constructor() { }

  ngOnInit(): void {
  }

}
