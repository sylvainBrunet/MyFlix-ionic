import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../series/series';
import { HomePage } from '../home/home';
import {FavoritesPage} from "../favorites/favorites";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = FavoritesPage

  constructor() {

  }
}
