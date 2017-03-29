import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizData } from '../../providers/quiz-data';
 
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
 
    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
 
    slideOptions: any;
    questions: any;
    title: string = "Rick and Morty Quiz";
 
 constructor(public navCtrl: NavController, public dataService: QuizData) {
 
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
 
        });
 
    }
 
    nextSlide(){
        this.slides.slideNext();
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
        }, 3000);
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
        this.score = 0;
        this.slides.slideTo(1, 1000);
    }
 
}