import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the QuizData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuizData {

    data: any;
 
    constructor(public http: Http) {
 
    }
 
    load(){
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        //Taking that new Promise and specifying what is stored in data (The Quiz JSON)
        return new Promise(resolve => {
 
            this.http.get('assets/quiz-data/questions.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
 
        });
 
    }
 
}
