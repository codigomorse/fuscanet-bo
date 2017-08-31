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
  testRadioOpen: boolean;
  testRadioResult; 

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
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
  selectProfile(Profile) {
    let alert = this.alertCtrl.create();
    alert.setTitle(`Seleccione un perfil para ${Profile.nombre} ${Profile.apellido}`);

    alert.addInput({
      type: 'radio',
      label: 'Estudiante',
      value: 'estudiante',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Medico',
      value: 'medico'
    });

    alert.addInput({
      type: 'radio',
      label: 'Consola',
      value: 'consola'
    });

    alert.addInput({
      type: 'radio',
      label: 'Denegado',
      value: 'denegado'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        Profile.perfil = data;
        console.log(Profile.$key);
        this.afDb.object(`profile/${Profile.$key}`).set(Profile);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
