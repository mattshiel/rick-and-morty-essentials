import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { SoundboardPage } from '../pages/soundboard/soundboard';
import { TabsPage } from '../pages/tabs/tabs';
import { QuizPage } from '../pages/quiz/quiz';
import { Data } from '../providers/data';
import { QuizData } from '../providers/quiz-data';
import { FlashCardComponent } from '../components/flash-card/flash-card';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    SoundboardPage,
    QuizPage,
    FlashCardComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    SoundboardPage,
    QuizPage  
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data, QuizData] //Added providers for the soundboard and quiz
})
export class AppModule {}
