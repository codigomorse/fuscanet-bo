import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { NoticiasLeidasDetalle } from '../noticias-leidas-detalle/noticias-leidas-detalle';
import { Convenios } from '../convenios/convenios';

@Component({
  selector: 'page-noticias-leidas',
  templateUrl: 'noticias-leidas.html',
})
export class NoticiasLeidas {

  user={};
  allNoticias$: FirebaseListObservable<Profile[]>;
  noticiasToShow$:any ;
  origEvent:any;
  noticiasLike$:any;

  constructor(public alertCtrl: AlertController, private modalCtrl:ModalController, private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => {
    this.user = data;
    //console.log(this.user);  
    this.allNoticias$ = this.afDb.list('noticiaLeida');
    this.allNoticias$.subscribe(data =>{
      this.origEvent = data;
      this.noticiasToShow$ = this.origEvent;
      this.procesarEntrada(this.noticiasToShow$);
    })
  })
  }
  procesarEntrada(leidas){
    //console.log('antes ',leidas);
    leidas.forEach(element => {
      this.buscarNoticia(element);
      let cont = 0;
      element.forEach(user => {
        cont ++;
      });
      element.contLeido = cont;
      //console.log(element);
    });
    //console.log('despues ',leidas);
    this.contarLinks(leidas);
  }
  contarLinks(leidas){
    //console.log('antes de contar ',leidas);
    leidas.forEach(noticia => {
      //console.log('buscame este id ',noticia.$key);
      this.afDb.database.ref(`noticiaLike/${noticia.$key}`).once('value').then(function(snapshot) {
        var links =snapshot.val();
        let cont =0;
        console.log(links);
        links.forEach(element => {
          //console.log(element);
          cont++;
          //console.log(cont);
        });
        noticia.links=cont;
        //console.log('despues de contar ', noticia);
      });
    });
  }
  buscarNoticia(clave){
    //console.log(clave);
    this.afDb.database.ref(`noticia/${clave.$key}`).once('value').then(function(snapshot) {
      clave.title=snapshot.val().title;
    });
  } 
  selectEvent(evento){
    //console.log(evento);
    this.navCtrl.push(NoticiasLeidasDetalle, {'noticia': evento});
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.noticiasToShow$ = this.origEvent;
  
    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(this.noticiasToShow$);
    //console.log(val);
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
