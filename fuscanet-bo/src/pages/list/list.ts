import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  user={};
  role={};
  allProfiles$: FirebaseListObservable<Profile[]>; 

  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
      this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.allProfiles$ = this.afDb.list('profile');
      
      //this.allProfiles$.subscribe(data => console.log(data));

     }); 
  }
    filterByPerfil(profile : Profile) : boolean{
      if(profile.perfil=="nuevo"){
        return false;
      }else{
        return true;
      }
    }

}
