import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Data {
 
    /* EDIT THESE IF FILE PATHS CHANGE*/
  title: string = "Rick and Morty Soundboard";
  url: string = "assets/data/soundfiles.html"; 
  base_url: string = "assets/data";
  sounds_url: string = "assets/data/";

  searchTerm: string = '';
  sounds: any = [];
  media: any = null;
 
constructor(public http: Http) {

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

  filterItems(searchTerm)
  {
      return this.sounds.filter((sound) => {
      return sound.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });     
 
  }
 
}