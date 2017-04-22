import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizData } from '../../providers/quiz-data';
import { LoadingController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native'; //Ionic native media
import { Platform } from 'ionic-angular'; //Imports Platform
 
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
 
    //We use different decorators (ViewChild) because we have different number of instances of the components that we want to select.
    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
    rank: string = "";
    media: any;
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
 
    //The view is loaded and the DOM is available
    ionViewDidLoad() {
        
        //Loading data from QuizData provider
        this.dataService.load().then((data) => {
            
            //map converts the result into a JSON decoded version of the result
            data.map((question) => {
 
                let originalOrder = question.answers; //Setting an original order so they can be randomized
                question.answers = this.randomizeAnswers(originalOrder); //Randomize the original order
                return question; //Return the result differently everytime quiz is repeated
 
            });     
 
            this.questions = data;

            this.slides.lockSwipeToNext(true);//Initially lock swiping forward on "Start" slide
 
        });
 
    }

    /*
    This function is for randomising numbers

    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min); //
    }
    */

    //View is active
    ionViewDidEnter() 
    {
        /*this.randomNum = this.randomIntFromInterval(0, 3);
        this.mediaSong = this.media[this.randomNum];*/

        this.media = new MediaPlugin('/android_asset/www/assets/data/sounds/remix.mp3') //Creating an instance of the media plugin and setting the song for the quiz
    }

    playStart()
    {
        this.media.play(); //Plays whatever is stored in media
    }

    //Creates a loading alert for when the quiz starts
    presentLoadingStart() 
    {
        let loader = this.loadingCtrl.create({
        content: "Inserting Seeds...",
        duration: 500
        });
        loader.present();
    }

  //Creates a loading alert for when the quiz restarts
    presentLoadingRestart()
    {
        let loader = this.loadingCtrl.create({
        content: "Squanching...",
        duration: 1000
        });
        loader.present();
    }
 

    nextSlide()
    {
        this.slides.lockSwipes(false);//Unlock swiping so you can go forward a slide
        this.slides.slideNext(); //Go to the next slide
        this.slides.lockSwipes(true);//Lock swiping so you can't skip forward or go backwards a slide
    }
 
    //Gets whether the answer is correct or false, sets the timeout for the flip animation
    selectAnswer(answer, question)
    {
 
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;
 
        if(answer.correct)
        {
            this.score++; //Incerement score by one everytime a correct answer is selected
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

        else if(this.score == 3)
        {
            this.rank = "summer";
        }

        else if(this.score == 4)
        {
            this.rank = "beth";
        }

        else if(this.score == 5)
        {
            this.rank = "snuffles";
        }

        else
        {
            this.rank = "rick";
        }

        //Score system
        /*if(this.score <= 0)
        {
            this.rank = "jerry";
        }

        else if(this.score > 0 && this.score <=2)
        {
            this.rank = "morty";
        }

        else if(this.score >=3 && this.score <=4)
        {
            this.rank = "beth";
        }

        else if(this.score >=5 && this.score <=7)
        {
            this.rank = "gazorpazorp";
        }

        else
        {
            this.rank = "rick";
        }*/
    }
    
    //Randomises answers and returns array
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
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true); //Lock swiping again to stop user from going through the quiz
    }
 
}