import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any;

  constructor(public navCtrl: NavController, public movieProvider: MovieProvider) {
this.getMovie();

  }
  getMovie() {
    this.movieProvider.getMovie()
    .then(data => {
      this.movies = data["Search"];
      console.log(this.movies);
    });
  }
}
