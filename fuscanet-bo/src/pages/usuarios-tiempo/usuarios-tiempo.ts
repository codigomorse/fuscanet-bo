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
  startTime:any;
  endTime:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.allProfiles$ = this.afDb.list('profile');
    this.allProfiles$.subscribe(data => {
      this.origProfiles = data;
      //this.profilesToShow$ = this.origProfiles;  
    });
  }
  filtrar(){
    this.profilesToShow$=[];
    if(!this.startTime || !this.endTime){
      alert('Complete los campos correctamente para realizar la busqueda');
    }else{
      this.origProfiles.forEach(element => {
        console.log(element.created);
        if(element.created > this.startTime && element.created < this.endTime){
          this.profilesToShow$.push(element);
        }
      });
    }
  }

}
