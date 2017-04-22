import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})

//Eported so we can import into our quiz class
export class FlashCardComponent {
 
  @Input('isFlipped') flipCard: boolean;
 
  constructor() {
 
  }
 
}