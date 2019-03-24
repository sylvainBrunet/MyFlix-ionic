import {Component, ViewChild} from '@angular/core';
import {NavController, Searchbar} from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";
import {DetailPage} from "../detail/detail";

@Component({
  selector: 'page-contact',
  templateUrl: 'series.html'
})
export class ContactPage {
  series: any;
  searchQuery: string = '';
  nbPage = 1;
  searchInput: string = '';
  searchEnabled: boolean = false;
  @ViewChild('searchbar') searchbar:Searchbar;
  constructor(public navCtrl: NavController, public movieProvider: MovieProvider) {

  }
  getMovie() {
    this.movieProvider.getMovie()
      .then(data => {
        this.series = data["Search"];
        console.log(this.series);
      });
  }
  openPreview(movie: any,type :any){
    this.navCtrl.push(DetailPage, {
      imdbId: movie.imdbID, type:type
    });
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.searchQuery = val;

    // if the value is an empty string don't filter the items
    this.movieProvider.getSearchMovie(val, "series",1)
      .then(data => {
        this.series = data["Search"];
        console.log(this.series);
      });
  }

  onCancel(ev: any){
    this.getMovie();
  }

  loadData(infiniteScroll) {
    this.nbPage++;

    this.movieProvider.getSearchMovie(this.searchQuery,"series",this.nbPage)
      .then((data:any) => {
        if(data){
          this.series = [...this.series, ...data["Search"]];
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
