import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  profileData: FirebaseObjectObservable<Profile>;
  user={};
  profile = {} as Profile;
  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public alert: AlertController,public platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          //console.log(this.profile);
      });  
     });
  }
  logoutUser(){
        let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want sing out and exit?',
        buttons: [{
          text: "sing out and exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
  }
  exitApp(){
    firebase.auth().signOut();
    this.platform.exitApp();
  }
}
