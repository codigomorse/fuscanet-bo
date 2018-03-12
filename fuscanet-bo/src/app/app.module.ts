import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Catalogo } from '../pages/catalogo/catalogo';
import { AddNoticia } from '../pages/add-noticia/add-noticia';
import { Convenios } from '../pages/convenios/convenios';
import { EventList } from '../pages/event-list/event-list';
import { ConvenioList } from '../pages/convenio-list/convenio-list';
import { NoticiaList } from '../pages/noticia-list/noticia-list';
import { Reportes } from '../pages/reportes/reportes';
import { UserList } from '../pages/user-list/user-list'; 
import { NoticiasLeidas } from '../pages/noticias-leidas/noticias-leidas';
import { NoticiasLeidasDetalle } from '../pages/noticias-leidas-detalle/noticias-leidas-detalle';

import { AngularFireModule } from 'angularfire2';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    Catalogo,
    AddNoticia,
    Convenios,
    EventList,
    ConvenioList,
    NoticiaList,
    Reportes,
    UserList,
    NoticiasLeidas,
    NoticiasLeidasDetalle
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    Catalogo,
    AddNoticia,
    Convenios,
    EventList,
    ConvenioList,
    NoticiaList,
    Reportes,
    UserList,
    NoticiasLeidas,
    NoticiasLeidasDetalle
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}