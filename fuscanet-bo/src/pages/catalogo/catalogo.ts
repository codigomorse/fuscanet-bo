import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';


@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html'
})
export class Catalogo {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, title: "", foto:"" };
  minDate = new Date().toISOString();

  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    //this.viewCtrl.dismiss();
  }
 
  save() {
    //this.viewCtrl.dismiss(this.event);
    console.log(this.event);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`events/${this.event.title+" "+this.event.startTime}`).set(this.event).then(() => alert("Se agrego el evento"));
    })
    this.navCtrl.setRoot('Home');
  }

}
