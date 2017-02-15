import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-soundboard',
  templateUrl: 'soundboard.html'
})

export class SoundboardPage {

  media: MediaPlugin = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.media = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');
  }

  showAlert(message) 
  {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

  startRecording() 
  {
  try {
    this.media.startRecord();
  }
  catch (e) {
    this.showAlert('Could not start recording.');
  }
}

stopRecording() 
{
  try {
    this.media.stopRecord();
  }
  catch (e) {
    this.showAlert('Could not stop recording.');
  }
}

startPlayback() {
  try {
    this.media.play();
  }
  catch (e) {
    this.showAlert('Could not play recording.');
  }
}

stopPlayback() {
  try {
    this.media.stop();
  }
  catch (e) {
    this.showAlert('Could not stop playing recording.');
  }

}

}
