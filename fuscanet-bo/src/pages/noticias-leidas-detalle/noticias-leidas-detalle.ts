import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-noticias-leidas-detalle',
  templateUrl: 'noticias-leidas-detalle.html',
})
export class NoticiasLeidasDetalle {
  noticia:any;
  usuarios$:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase) {
    this.noticia = this.navParams.get('noticia');
    this.usuarios$=[];
    console.log('llega esta noticia: ',this.noticia);
    var self = this;
    this.noticia.forEach(element => {
      console.log('buscame este id: ',element);
      this.getUserByid(element, self);
    });
  }
  getUserByid(id, self){
    this.afDb.database.ref(`profile/${id}`).once('value').then(function(snapshot) {
      var user:any;
      user=snapshot.val();
      id=user;
      console.log('esto devuelve la bd ',id);
      self.usuarios$.push(id);
    });
  }

}
