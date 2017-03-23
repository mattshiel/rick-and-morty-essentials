import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { SoundboardPage } from '../pages/soundboard/soundboard';
import { TabsPage } from '../pages/tabs/tabs';
import { InsultGeneratorPage } from '../pages/insultgenerator/insultgenerator';
import { Data } from '../providers/data';

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
