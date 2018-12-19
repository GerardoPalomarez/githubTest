import {Component, HostBinding} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  styleUrls: [ './home.style.scss' ],
  templateUrl: './home.template.html',
})
export class HomeComponent {
  public userData: any;
  router: Router;

  constructor(router: Router) {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.router = router;
  }

}
