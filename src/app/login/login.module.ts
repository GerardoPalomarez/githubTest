import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';


export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'recuperar-cuenta', component: RecuperarCuentaComponent, pathMatch: 'full' }

];

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarCuentaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {
  static routes = routes;
}
