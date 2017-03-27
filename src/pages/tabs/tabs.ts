import { Component } from '@angular/core';

import { SoundboardPage } from '../soundboard/soundboard';
import { QuizPage } from '../quiz/quiz';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SoundboardPage;
  tab2Root: any = QuizPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
