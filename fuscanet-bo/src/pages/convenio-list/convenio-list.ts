import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-convenio-list',
  templateUrl: 'convenio-list.html',
})
export class ConvenioList {
  user={};
  allConvenios$: FirebaseListObservable<Profile[]>;
  conveniosToShow$:any;
  origConvenios:any;

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    this.allConvenios$ = this.afDb.list('convenio');
    this.allConvenios$.subscribe(data =>{
      this.origConvenios = data;
      this.conveniosToShow$ = this.origConvenios;
    })
   }); 
}

getItems(ev: any) {
  // Reset items back to all of the items
  this.conveniosToShow$ = this.origConvenios;

  // set val to the value of the searchbar
  let val = ev.target.value;
  //console.log(this.eventToShow$);
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.conveniosToShow$ = this.conveniosToShow$.filter((item) => {
      //console.log(item.nombre);
      //console.log(val);
      return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

}
