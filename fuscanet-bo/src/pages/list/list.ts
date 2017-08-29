import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  user={};
  role={};
  allProfiles=[];

  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.list(`/profile/`).subscribe(_data => {
          //aca tengo todos los perfiles
          //tengo que cotejar que filtrar solo los q no tienen role
          //encarar los observables......
          this.allProfiles = _data;
          console.log(this.allProfiles);
      });  
     });
    
  }

}
