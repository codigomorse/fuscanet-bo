import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { Catalogo } from '../catalogo/catalogo';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventList {
  user={};
  allEvents$: FirebaseListObservable<Profile[]>;
  eventToShow$:any ;
  origEvent:any;

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allEvents$ = this.afDb.list('events');
    this.allEvents$.subscribe(data =>{
      this.origEvent = data;
      this.eventToShow$ = this.origEvent;
    })
    //this.allProfiles$.subscribe(data => console.log(data));

   }); 
}

  getItems(ev: any) {
    // Reset items back to all of the items
    this.eventToShow$ = this.origEvent;

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(this.eventToShow$);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.eventToShow$ = this.eventToShow$.filter((item) => {
        //console.log(item.nombre);
        //console.log(val);
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  selectEvent(evento){
    console.log('seleccionado: ',evento);
    this.navCtrl.push(Catalogo, {'evento': evento});
    //let modal = this.modalCtrl.create(AddNoticia,  {'noticia': event});
      //modal.onDidDismiss((data) => {console.log(data)});
    //  modal.present();
  }

}
