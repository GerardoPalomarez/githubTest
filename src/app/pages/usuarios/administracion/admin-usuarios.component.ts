import {Component, OnInit, AfterViewInit} from '@angular/core';
declare let jQuery: any;

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class UsuariosAdminComponent implements OnInit, AfterViewInit {
  public phoneMask = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')',
      ' ', /\d/, /\d/, /\d/,
      '-', /\d/, /\d/, /\d/, /\d/]
  };
  public selected: any;
  public select2Options: any = {
    theme: 'bootstrap'
  };

  constructor() { }

  ngAfterViewInit(): void {
    jQuery('.parsleyjs').parsley();
  }


  ngOnInit(): void {
  }

}



