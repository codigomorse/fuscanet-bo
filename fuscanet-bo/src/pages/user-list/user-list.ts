import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserList {
  user={};
  role={};
  allProfiles$: FirebaseListObservable<Profile[]>;
  profilesToShow$:any;
  origProfiles:any;

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allProfiles$ = this.afDb.list('profile');
    //this.profilesToShow$ = this.allProfiles$;
    this.allProfiles$.subscribe(data => {
      this.origProfiles = data;
      this.profilesToShow$ = this.origProfiles;  
    });

   }); 

}
getItems(ev: any) {
  // Reset items back to all of the items
  this.profilesToShow$ = this.origProfiles;

  // set val to the value of the searchbar
  let val = ev.target.value;
  console.log(this.profilesToShow$);
  console.log(val);
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.profilesToShow$ = this.profilesToShow$.filter((item) => {
      //console.log(item.nombre);
      //console.log(val);
      return (item.correo.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}
getItemsCedula(ev: any) {
  // Reset items back to all of the items
  this.profilesToShow$ = this.origProfiles;

  // set val to the value of the searchbar
  let val = ev.target.value;
  //console.log(this.profilesToShow$);
  //console.log(val);
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.profilesToShow$ = this.profilesToShow$.filter((item) => {
      //console.log(item.cedula);
      //console.log(val);
      return (item.cedula.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}


}
