import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showHeaderAndFooter = true;

  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (['/administration', '/donation'].includes(val.url.split("?")[0])) {
          this.showHeaderAndFooter = false;
        } else {
          this.showHeaderAndFooter = true;
        }
      }
    });
  }
}
