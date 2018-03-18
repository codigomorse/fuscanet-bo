import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-usuarios-tiempo',
  templateUrl: 'usuarios-tiempo.html',
})
export class UsuariosTiempo {
  user={};
  role={};
  allProfiles$: FirebaseListObservable<Profile[]>;
  profilesToShow$:any;
  origProfiles:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.allProfiles$ = this.afDb.list('profile');
    this.allProfiles$.subscribe(data => {
      this.origProfiles = data;
      this.profilesToShow$ = this.origProfiles;  
    });
  }

}
