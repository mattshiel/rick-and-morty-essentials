import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-soundboard',
  templateUrl: 'soundboard.html'
})

export class SoundboardPage {

    /* EDIT THESE */
  title: string = "Rick and Morty Soundboard";
  base_url: string = "/android_asset/www";
  sounds_url: string = "/soundfiles";
  media: MediaPlugin = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) 
  {

  }

  ionViewDidEnter() 
  {
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

  startPlayback() 
  {
    try 
    {
      this.media.play();
    }

    catch (e) 
    {
      this.showAlert('Could not play recording.');
    }
  }

}