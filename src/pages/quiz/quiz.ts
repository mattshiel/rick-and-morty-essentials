import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizData } from '../../providers/quiz-data';
import { LoadingController } from 'ionic-angular';
 
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
 
    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
    rank: string = "";
 
    slideOptions: any;
    questions: any;
    title: string = "Rick and Morty Quiz";
 
 constructor(public navCtrl: NavController, public dataService: QuizData, public loadingCtrl: LoadingController) {
 
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

            this.slides.lockSwipeToNext(true);
 
        });
 
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
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
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
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true); //Lock swiping again to stop user from going through the quiz
    }
 
}