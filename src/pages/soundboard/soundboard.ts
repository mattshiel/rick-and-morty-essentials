import { Component } from '@angular/core';
import { Platform } from 'ionic-angular'; //Imports Platform
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { Http } from '@angular/http'; //Imports HTTP
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-soundboard',
  templateUrl: 'soundboard.html'
})

export class SoundboardPage {

  /* EDIT THESE IF FILE PATHS CHANGE*/
  title: string = "Rick and Morty Soundboard";
  url: string = "assets/data/soundfiles.html"; 
  base_url: string = "assets/data";
  sounds_url: string = "assets/data/";
  
  //media: MediaPlugin = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');

  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  sounds: any = [];
  media: any = null;

constructor(public http: Http, public alertCtrl: AlertController, private platform: Platform, public navCtrl: NavController, public dataService: Data) {

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
      let doc: any = document.createElement("html"); //Creating a html document
      doc.innerHTML = content;

      let links: any = doc.getElementsByTagName("a"); //Getting the name of the sound in the link tag

      /*Looping over*/
      for(let link of links) 
      {
        let filename: any = link.getAttribute("href"); //Gets filename as referenced in the href tag

        if(filename.startsWith("/")) 
        {
          filename = this.base_url + filename; //Joining strings to create the filename
        }

        else 
        {
          filename = this.sounds_url + filename;  //Joining strings to create the filename
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

     this.searchControl = new FormControl();
 
}

  filterItems(searchTerm)
  {
      return this.sounds.filter((sound) => {
      return sound.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });     
 
  }
  /*ionViewDidEnter() 
  {
    //this.media = new MediaPlugin('/android_asset/www/soundfiles/lick_my_balls.mp3');
  }*/

   
  setFilteredItems()
  {
      this.sounds = this.dataService.filterItems(this.searchTerm);
  }

  ionViewDidLoad()
  {
        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          
        this.searching = false;
        this.setFilteredItems();
 
        });
  }

   onSearchInput(){
      this.searching = true;
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