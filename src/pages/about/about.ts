import { DetailPage } from './../detail/detail';
import { MovieProvider } from './../../providers/movie/movie';
import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  movies: any;
  searchQuery: string = '';
  nbPage = 1;
  searchEnabled: boolean = false;
  @ViewChild('searchbar') searchbar:Searchbar;


  constructor(public navCtrl: NavController, public movieProvider: MovieProvider) {

  }
  getMovie() {
    this.movieProvider.getMovie()
    .then(data => {
      this.movies = data["Search"];
    });
  }
  openPreview(movie: any, type:any){
    this.navCtrl.push(DetailPage, {
      imdbId: movie.imdbID, type: type
    });
  }
  getItems(ev: any) {
    const val = ev.target.value;
    this.searchQuery = val;
    this.movieProvider.getSearchMovie(val, "movie",1)
    .then(data => {
      this.movies = data["Search"];
    });
  }

  onCancel(ev: any){
    this.getMovie();
  }

  loadData(infiniteScroll) {
    this.nbPage++;

    this.movieProvider.getSearchMovie(this.searchQuery,"movie",this.nbPage)
    .then((data:any) => {
        if(data){
            this.movies = [...this.movies, ...data["Search"]];
            infiniteScroll.complete();
        }
        else {
            infiniteScroll.enable(false);
        }
    }, () => {
        infiniteScroll.enable(false);
    });
}

}
