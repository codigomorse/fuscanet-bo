import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-noticia-list',
  templateUrl: 'noticia-list.html',
})
export class NoticiaList {

  user={};
  allNoticias$: FirebaseListObservable<Profile[]>;
  noticiasToShow$:any ;
  origEvent:any;

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allNoticias$ = this.afDb.list('noticia');
    this.allNoticias$.subscribe(data =>{
      this.origEvent = data;
      this.noticiasToShow$ = this.origEvent;
    })
    
    //this.allProfiles$.subscribe(data => console.log(data));

   }); 
}
getItems(ev: any) {
  // Reset items back to all of the items
  this.noticiasToShow$ = this.origEvent;

  // set val to the value of the searchbar
  let val = ev.target.value;
  //console.log(this.eventToShow$);
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.noticiasToShow$ = this.noticiasToShow$.filter((item) => {
      //console.log(item.nombre);
      //console.log(val);
      return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

}
