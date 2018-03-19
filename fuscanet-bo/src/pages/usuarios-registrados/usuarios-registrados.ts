import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { UsuariosTiempo } from '../usuarios-tiempo/usuarios-tiempo';
import { UsuariosEspecialidad } from '../usuarios-especialidad/usuarios-especialidad';

@Component({
  selector: 'page-usuarios-registrados',
  templateUrl: 'usuarios-registrados.html',
})
export class UsuariosRegistrados {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goUsuariosTiempo(){
    this.navCtrl.push(UsuariosTiempo);
  }
  goEspecialidad(){
    this.navCtrl.push(UsuariosEspecialidad);
  }
}
