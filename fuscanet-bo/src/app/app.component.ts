import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Home } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Catalogo } from '../pages/catalogo/catalogo';
import { AddNoticia } from '../pages/add-noticia/add-noticia';
import { Convenios } from '../pages/convenios/convenios';
import { EventList } from '../pages/event-list/event-list';
import { ConvenioList } from '../pages/convenio-list/convenio-list';
import { NoticiaList } from '../pages/noticia-list/noticia-list';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: Home },
      { title: 'Usuarios Pendientes', component: ListPage },
      { title: 'Agregar Eventos', component: Catalogo },
      { title: 'Agregar Noticias', component: AddNoticia },
      { title: 'Agregar Convenios', component: Convenios },
      { title: 'Listar Eventos', component: EventList },
      { title: 'Listar Noticias', component: NoticiaList },
      { title: 'Listar Convenios', component: ConvenioList },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
