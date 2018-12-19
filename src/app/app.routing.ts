import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from './services/_guards';

export const ROUTES: Routes = [
    { path: '', loadChildren: './pages/pages.module#PagesModule', canActivate: [AuthGuard]},
    // { path: '', loadChildren: './pages/pages.module#PagesModule'},
    {
        path: 'login', loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'error', component: ErrorComponent
    },
    {
        path: '**',    component: ErrorComponent
    }
];
// export const routing = RouterModule.forRoot(appRoutes);