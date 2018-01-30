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

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allConvenios$ = this.afDb.list('convenio');
    
    //this.allProfiles$.subscribe(data => console.log(data));

   }); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventList');
  }

}
