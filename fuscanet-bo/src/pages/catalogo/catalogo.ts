import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import * as moment from 'moment';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html'
})
export class Catalogo {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, title: "", foto:"" };
  //minDate = new Date().toISOString();
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
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.mypicref = firebase.storage().ref('/');
  }
  ionViewDidLoad(){
    var upload = document.getElementById("myFile");
    upload.addEventListener('change', function(e: any){
       var file = e.target.files[0];
       console.log(file);
       var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      var storageRef = firebase.storage().ref(uuid+'/' + file.name);
      storageRef.put(file).then( savepic => {
          var picurl = savepic.downloadURL;
          console.log(picurl);
      });
    })
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
  
  // async updatePhoto(): Promise<any>{
  //   try{
  //     this.picdata = await this.camera.getPicture(this.options);
  //     this.upload();
  //   }catch(e){console.log(e)}
  // }
  // upload(){
  //   this.mypicref.child(this.uid()).child('pic.jpeg')
  //   .putString(this.picdata, 'base64',{contentType:'image/jpeg'})
  //   .then(savepic =>{
  //     this.picurl= savepic.downloadURL;
  //     this.event.foto = this.picurl;
  //     this.image = this.picurl;
  //     //alert(this.picurl);
  //   }) 
  // }
  
  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}
