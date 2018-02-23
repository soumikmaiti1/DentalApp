import { Component } from '@angular/core';
import { ScoreCardPage } from '../ScoreCard/ScoreCard';
import { SettingsPage } from '../Settings/Settings';
import { HomePage } from '../home/home';
import * as $ from 'jquery';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScoreCardPage;
  tab3Root = SettingsPage;

  constructor() {

  }
  ionViewWillEnter() {
    $(".tabs-md .tab-button").css("display", "block");
    $(".tabs-ios .tab-button").css("display", "block");
  }
}
