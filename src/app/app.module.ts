import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Autosize } from 'ng-autosize';

// used to create fake backend

import { AppComponent }  from './app.component';
import { ROUTES } from './app.routing';

import { BasicAuthInterceptor, ErrorInterceptor } from './services/_helpers';
import { ErrorComponent } from './pages/error/error.component';
import { RouterModule } from '@angular/router';
import { AppConfig } from './app.config';
import { fakeBackendProvider } from './services/_helpers';
import { DashboardService } from './services/dashboard.service';

const APP_PROVIDERS = [
    AppConfig
  ];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, {
          useHash: false, // Agrega al inicio de la app /#/ antes de las rutas.
        })
      ],
    providers: [
        APP_PROVIDERS,
        DashboardService,
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    
})

export class AppModule { }