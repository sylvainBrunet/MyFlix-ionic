import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import {MovieProvider} from "../../providers/movie/movie";
import {FavoritesProvider} from "../../providers/favorites/favorites";

/**
 * Generated class for the EpisodeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-detail',
  templateUrl: 'episode-detail.html',
})
export class EpisodeDetailPage {

  episode: any;
  imdbId: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public movieProvider: MovieProvider
    ,public favoritesProvider: FavoritesProvider) {
    this.imdbId = this.navParams.get('imdbId');

    console.log("id" + this.imdbId);
    this.getEpisodeDetails(this.imdbId);

  }



  getEpisodeDetails(imdbId){
    this.movieProvider.getDetailMovie(imdbId)
      .then(data => {
        this.episode = data;
      });
  }

}
