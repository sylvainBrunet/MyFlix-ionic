import { GridPipe } from './../pipes/grid/grid';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/Storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/series/series';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { FavoritesPage } from '../pages/favorites/favorites';
import {SeasonDetailPage} from "../pages/season-detail/season-detail";
import {EpisodeDetailPage} from "../pages/episode-detail/episode-detail";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieProvider } from '../providers/movie/movie';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from "@ionic-native/file-path";
import { File } from '@ionic-native/file';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GridPipe,
    DetailPage,
    FavoritesPage,
    SeasonDetailPage,
    EpisodeDetailPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    FavoritesPage,
    SeasonDetailPage,
    EpisodeDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider,
    HttpClientModule,
    GridPipe,
    SocialSharing,
    FavoritesProvider,
    FileChooser,
    FilePath,
    File
  ]
})
export class AppModule {}
