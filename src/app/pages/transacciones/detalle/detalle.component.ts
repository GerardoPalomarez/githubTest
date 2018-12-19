import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-transacciones-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class TransaccionesDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  print(): void {
    window.print();
  }

}



