import {Component, HostBinding} from '@angular/core';


@Component({
  selector: 'app-recuperar-cuenta',
  styleUrls: [ './recuperar-cuenta.style.scss' ],
  templateUrl: './recuperar-cuenta.template.html'
})
export class RecuperarCuentaComponent {

  @HostBinding('class') classes = 'login-page app';

  constructor() {}

}
