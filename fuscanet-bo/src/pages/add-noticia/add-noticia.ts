import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-noticia',
  templateUrl: 'add-noticia.html',
})
export class AddNoticia {

  noticia = { startTime: new Date().toISOString(), title: "", foto:"", especialidad: [""],id: new Date().toISOString(),activa:"",link:""};
  image = "assets/img/default.png";
  picdata:any;
  picurl:any;
  mypicref:any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(private camera: Camera,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.noticia.startTime = preselectedDate;
    this.mypicref = firebase.storage().ref('/');
    this.noticia = this.navParams.get('noticia');
    if(!this.noticia){
      this.noticia = { startTime: new Date().toISOString(), title: "", foto:"", especialidad: [""],id: new Date().toISOString(),activa:"ACTIVA",link:""};
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      this.noticia.id=uuid;
    }else{
      this.image = this.noticia.foto;
    }
  
  }
  ionViewDidLoad(){
    var upload = document.getElementById("myFile");
    var self = this;
    upload.addEventListener('change', function(e: any){
       var file = e.target.files[0];
       //console.log(file);
       var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      var storageRef = firebase.storage().ref(uuid+'/' + file.name);
      storageRef.put(file).then( savepic => {
          var picturl = savepic.downloadURL;
          console.log(picturl);
          self.picurl= savepic.downloadURL;
          self.noticia.foto = self.picurl;
          self.image = self.picurl;
      });
    })
  }
  save() {
    //this.viewCtrl.dismiss(this.event);
    //console.log(this.noticia);
    
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticia/${this.noticia.id}`).set(this.noticia).then(() => alert("Se agrego la noticia"));
    })
    this.navCtrl.setRoot('Home');
  }
  
}
