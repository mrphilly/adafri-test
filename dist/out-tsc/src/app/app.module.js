import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeModule } from './home/home.module';
import { FIREBASE_CREDENTIALS } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
/* import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage'; */
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardModule } from "./dashboard/dashboard.module";
import { FacebookModule } from "./facebook/facebook.module";
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr', localeFrExtra);
// create a translation file loader
export const createTranslateLoader = (http) => new TranslateHttpLoader(http);
/* firebase.initializeApp(FIREBASE_CREDENTIALS) */
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MaterialModule,
            DashboardModule,
            FacebookModule,
            HttpClientModule,
            HomeModule,
            AngularFirestoreModule,
            AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
            AngularFireAuthModule,
            /*  AngularFireStorageModule,
             AngularFireFunctionsModule, */
            FormsModule,
            CoreModule,
            ReactiveFormsModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                }
            })
        ],
        providers: [AngularFirestore, TranslateService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map