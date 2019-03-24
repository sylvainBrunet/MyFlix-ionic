import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from './../../providers/movie/movie';
import { SocialSharing } from '@ionic-native/social-sharing';
import {FavoritesProvider} from "../../providers/favorites/favorites";
import {Serie} from "../../models/Series";
import {SeasonDetailPage} from "../season-detail/season-detail";



/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  fav = 0;
  imdbID: any;
  movie: Serie;
  type: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider,public socialSharing: SocialSharing, public favoritesProvider: FavoritesProvider) {
    this.imdbID = this.navParams.get('imdbId');
    this.type = this.navParams.get('type');
    console.log(this.imdbID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.getItems(this.imdbID);

  }
  public Serie = () =>{
    return this.movie;
  }
  getItems(val: any) {
    this.movieProvider.getDetailMovie(val)
    .then(data => {
      this.movie = new Serie(data);
      console.log(this.movie);
    });
  }
  goToSeasonDetails(saison){
    this.navCtrl.push(SeasonDetailPage,{saison:saison,imdbId:this.imdbID});
  }
  share() {
    this.socialSharing.share('Body', 'Subject', this.movie.imdbID).then(() => {
    }).catch(() => {
    });
  }
  addToFav() {
      if (this.fav == 0){
        this.favoritesProvider.addToFav(this.movie.title);
        this.fav = 1;
      } else{
        this.favoritesProvider.removeFromFav(this.movie.title);
        this.fav = 0;
      }

  }

}
