import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";
import {EpisodeDetailPage} from "../episode-detail/episode-detail";

/**
 * Generated class for the SeasonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-season-detail',
  templateUrl: 'season-detail.html',
})
export class SeasonDetailPage {
  number:any;
  episodes:any;
  imdbId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public movieProvider: MovieProvider) {
    this.number = this.navParams.get('saison');
    this.imdbId = this.navParams.get('imdbId');
    this.getSeasonEpisode(this.imdbId,this.number);
  }

  getSeasonEpisode(id, seasonNumber){
    this.movieProvider.getEpisodes(id, seasonNumber)
      .then(data => {
        this.episodes = data;
      });
  }

  openPreview(episode){
    this.navCtrl.push(EpisodeDetailPage,{imdbId:episode.imdbID});
  }

}
