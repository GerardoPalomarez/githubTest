import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { PerfilComponent } from './perfil/perfil.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // { path: '', component: HomeComponent, canActivate: [NeedAuthGuard] },
            { path: '', component: HomeComponent},
            { path: 'dashboard', component: DashboardsComponent},
            // { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},
            // { path: 'transacciones', loadChildren: './transacciones/transacciones.module#TransaccionesModule'},
            // { path: 'perfil', component: PerfilComponent},

        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
