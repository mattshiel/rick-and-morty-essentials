import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { SoundboardPage } from '../pages/soundboard/soundboard';
import { TabsPage } from '../pages/tabs/tabs';
import { InsultGeneratorPage } from '../pages/insultgenerator/insultgenerator';
import { Data } from '../providers/data';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA-w3ldZoCpbxfdQbE750rGALcIAkmUgNg",
  authDomain: "rick-and-morty-essentials.firebaseapp.com",
  databaseURL: "https://rick-and-morty-essentials.firebaseio.com",
  storageBucket: "rick-and-morty-essentials.appspot.com",
  messagingSenderId: "39604505070"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    SoundboardPage,
    InsultGeneratorPage
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
    InsultGeneratorPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data]
})
export class AppModule {}
