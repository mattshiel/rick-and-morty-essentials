import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2'; //Imports FireBase
import { Platform } from 'ionic-angular'; //Imports Platform
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
import {Http} from '@angular/http'; //Imports HTTP
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'page-soundboard',
  templateUrl: 'soundboard.html'
})

export class SoundboardPage {

    /* EDIT THESE */
  title: string = "Rick and Morty Soundboard";
  url: string = "assets/data/soundfiles.html"; 
  base_url: string = "assets/data";
  sounds_url: string = "assets/data/";
  
  //media: MediaPlugin = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');

  sounds: any = [];
  media: any = null;

constructor(public http: Http, public alertCtrl: AlertController, private platform: Platform) {

    /*Pushes the sound title and file path to the array
    if (this.platform.is('android')) 
    {
        this.url = "/android_asset/www/" + this.url;
    }

    else
    {
      this.url = "assets/data/soundfiles.html"; 
    }*/

    this.http.get(this.url).subscribe(data => 
    {
    
      let content: string = data.text();
      let doc: any = document.createElement("html");
      doc.innerHTML = content;

      let links: any = doc.getElementsByTagName("a");

      /*Looping over */
      for(let link of links) 
      {
        let filename: any = link.getAttribute("href");

        if(filename.startsWith("/")) 
        {
          filename = this.base_url + filename;
        }

        else 
        {
          filename = this.sounds_url + filename;
        }

          /*Pushes the sound title and file path to the array*/
          this.sounds.push
          ({
            title: link.innerHTML,
            file: filename
          });
      }

      },
        
      err => console.error('There was an error: ' + err),
      () => console.log('Get request completed')
    );
 
}
  /*ionViewDidEnter() 
  {
    //this.media = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');
  }*/

  showAlert(message) 
  {
    let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });

  alert.present();
  }

  play(sound) 
  {
    try 
    {
      console.log(sound);

      if(this.media) 
      {
        this.media.pause();
      }
    
      this.media = new Audio(sound.file);
      this.media.load();
      this.media.play();
    }

    catch (e) 
    {
      this.showAlert('Could not play recording.');
    }
  }

   reorderItems(indexes)
   {
        this.sounds = reorderArray(this.sounds, indexes);
   }

}