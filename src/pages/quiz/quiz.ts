import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizData } from '../../providers/quiz-data';
import { LoadingController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
import { Platform } from 'ionic-angular'; //Imports Platform
 
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
 
    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
    rank: string = "";
    media: any;
    /*media:  MediaPlugin[] = [
                                new MediaPlugin('/android_asset/www/assets/data/sounds/doyoufeelit.mp3'), 
                                new MediaPlugin('/android_asset/www/assets/data/sounds/moonmen.mp3'),
                                new MediaPlugin('/android_asset/www/assets/data/sounds/hurt.mp3'),
                                new MediaPlugin('/android_asset/www/assets/data/sounds/remix.mp3')
                            ];*/
    randomNum: number;
    mediaSong: any;
    slideOptions: any;
    questions: any;
    title: string = "Rick and Morty Quiz";
 
 constructor(public navCtrl: NavController, public dataService: QuizData, public loadingCtrl: LoadingController,private platform: Platform) {
 
        this.slideOptions = {
            onlyExternal: true
        };
 
    }
 
    ionViewDidLoad() {
 
        this.dataService.load().then((data) => {
 
            data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });     
 
            this.questions = data;

            this.slides.lockSwipeToNext(true);//Initially lock swiping forward on "Start" slide
 
        });
 
    }

    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    ionViewDidEnter() 
    {
        /*this.randomNum = this.randomIntFromInterval(0, 3);
        this.mediaSong = this.media[this.randomNum];*/

        this.media = new MediaPlugin('/android_asset/www/assets/data/sounds/remix.mp3')
    }

    playStart()
    {
        this.media.play();
    }

    presentLoadingStart() {
    let loader = this.loadingCtrl.create({
      content: "Inserting Seeds...",
      duration: 500
    });
    loader.present();
  }

    presentLoadingRestart() {
    let loader = this.loadingCtrl.create({
      content: "Squanching...",
      duration: 1000
    });
    loader.present();
  }
 
    nextSlide(){
        this.slides.lockSwipes(false);//Unlock swiping so you can go forward a slide
        this.slides.slideNext();
        this.slides.lockSwipes(true);//Lock swiping so you can't skip forward or go backwards a slide
    }
 
    selectAnswer(answer, question){
 
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;
 
        if(answer.correct){
            this.score++;
        }
 
        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 1500);

        
        if(this.score <= 0)
        {
            this.rank = "jerry";
        }

        else if(this.score == 1)
        {
            this.rank = "morty";
        }

        else if(this.score == 2)
        {
            this.rank = "gazorpazorp";
        }

        else
        {
            this.rank = "rick";
        }
    }
 
    randomizeAnswers(rawAnswers: any[]): any[] {
 
        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
 
        return rawAnswers;
 
    }
 
    restartQuiz(){
        this.slides.lockSwipes(false); //Unlock swiping so you can go back to the start
        this.score = 0;
        this.media.stop();
        /*this.randomNum = this.randomIntFromInterval(0, 2);
        this.mediaSong = this.media[this.randomNum];*/
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true); //Lock swiping again to stop user from going through the quiz
    }
 
}