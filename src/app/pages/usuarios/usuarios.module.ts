import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TooltipModule, AlertModule, BsDropdownModule } from 'ngx-bootstrap';
// import { Autosize } from 'ng-autosize';
import { WidgetModule } from '../../layout/widget/widget.module';
import { TextMaskModule } from 'angular2-text-mask';
import { UsuariosComponent } from './listado/usuarios.component';
import { SearchPipe } from './pipes/search-pipe';
import { DataTableModule } from 'angular2-datatable';
import { UsuariosAdminComponent } from './administracion/admin-usuarios.component';

export const routes = [
  {path: '',  component: UsuariosComponent},
  {path: 'admin', component: UsuariosAdminComponent},
];

@NgModule({
  declarations: [
    // Autosize,
    SearchPipe,
    UsuariosComponent,
    UsuariosAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    DataTableModule,
    WidgetModule,
    RouterModule.forChild(routes),
  ]
})
export class UsuariosModule {
  static routes = routes;
}
