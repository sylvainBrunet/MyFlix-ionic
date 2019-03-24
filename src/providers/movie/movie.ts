import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  apiUrl = 'http://www.omdbapi.com/?';
  searchUrl = 's';
  detailUrl = 'i';
  apiKey = '&apikey=75522b56';

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getMovie() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getSearchMovie(searchValue: String, type: String, nbPage: number) {
    console.log(this.apiUrl+this.searchUrl+'='+searchValue+'&type='+type+'&page='+nbPage+this.apiKey);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+this.searchUrl+'='+searchValue+'&type='+type+'&page='+nbPage+this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getDetailMovie(searchValue: String) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+this.detailUrl+'='+searchValue+this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getEpisodes(id, seasonNumber) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +this.apiKey+ "&i=" + id + "&plot=full" + "&season=" + seasonNumber).subscribe(data => {
            resolve(data["Episodes"]);
          }, err => {
            console.log(err);
          }
        );
    });
  }
  

}
