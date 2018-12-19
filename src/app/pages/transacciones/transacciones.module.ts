import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TooltipModule, AlertModule, BsDropdownModule } from 'ngx-bootstrap';
// import { Autosize } from 'ng-autosize';
import { WidgetModule } from '../../layout/widget/widget.module';
import { DataTableModule } from 'angular2-datatable';
import { TransaccionesComponent } from './general/transacciones.component';
import { TransaccionesStatusComponent } from './status/status.component';
import { TransaccionesDetalleComponent } from './detalle/detalle.component';

export const routes = [
  {path: '',  component: TransaccionesComponent},
  {path: 'detalle/:id', component: TransaccionesDetalleComponent},
  {path: 'status/:condition', component: TransaccionesStatusComponent},

];

@NgModule({
  declarations: [
    // Autosize,
    TransaccionesComponent,
    TransaccionesStatusComponent,
    TransaccionesDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    DataTableModule,
    WidgetModule,
    RouterModule.forChild(routes),
  ]
})
export class TransaccionesModule {
  static routes = routes;
}
