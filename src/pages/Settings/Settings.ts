import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import {IndexPage} from '../index/index';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-contact',
  templateUrl: 'Settings.html'
})
export class SettingsPage {
  imageURL:any;
  constructor(public navCtrl: NavController,private camera: Camera,private socialSharing: SocialSharing,private storage: Storage) {

  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit:true
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imageURL = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
  Logout()
  {
    //this.storage.clear();
    this.navCtrl.push(IndexPage);
  }
  socialShare()
  {
    this.socialSharing.share('Our new dental App', 'Dental Quiz App subject', '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}
