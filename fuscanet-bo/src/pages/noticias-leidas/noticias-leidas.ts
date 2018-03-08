import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-noticias-leidas',
  templateUrl: 'noticias-leidas.html',
})
export class NoticiasLeidas {

  user={};
  allNoticias$: FirebaseListObservable<Profile[]>;
  noticiasToShow$:any ;
  origEvent:any;

  constructor(public alertCtrl: AlertController, private modalCtrl:ModalController, private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allNoticias$ = this.afDb.list('noticiaLeida');
    this.allNoticias$.subscribe(data =>{
      this.origEvent = data;
      this.noticiasToShow$ = this.origEvent;
      this.procesarEntrada(this.noticiasToShow$);
    })
  })
  }
  procesarEntrada(leidas){
    console.log('antes ',leidas);
    leidas.forEach(element => {
      this.buscarNoticia(element);
      let cont = 0;
      element.forEach(user => {
        cont ++;
      });
      element.contLeido = cont;
      console.log(element);
    });
    console.log('despues ',leidas);
  }
  buscarNoticia(clave){
    //console.log(clave);
    this.afDb.database.ref(`noticia/${clave.$key}`).once('value').then(function(snapshot) {
      clave.title=snapshot.val().title;
    });
  }
}
