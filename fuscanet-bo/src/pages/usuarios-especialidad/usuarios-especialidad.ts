import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-usuarios-especialidad',
  templateUrl: 'usuarios-especialidad.html',
})
export class UsuariosEspecialidad {
  user={};
  role={};
  allProfiles$: FirebaseListObservable<Profile[]>;
  profilesToShow$:any;
  origProfiles:any;
  startTime:any;
  endTime:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase) {
    this.allProfiles$ = this.afDb.list('profile');
    this.allProfiles$.subscribe(data => {
      this.origProfiles = data;
      //this.profilesToShow$ = this.origProfiles;  
    });
  }

}
