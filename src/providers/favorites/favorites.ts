import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/Storage';

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {

  private listeFav: any[] = [];
  public change: EventEmitter<any[]> = new EventEmitter();
  static HISTORY_STORAGE_KEY: string = 'keystor';

  constructor(public http: HttpClient, public storage:Storage) {
    this.init();
  }

  addToFav(date: string) {
    this.listeFav.push(
      date
    );
    this.save();
    this.change.emit(this.listeFav);
  }
  removeFromFav(id: string){
    let index = this.listeFav.findIndex(d => d === id); //find index in your array
    this.listeFav.splice(index, 1);
    this.save();
    this.change.emit(this.listeFav);
  }
  save() {
    return this.storage.set(FavoritesProvider.HISTORY_STORAGE_KEY, this.listeFav);
  }

  private async init() {
    try {
      this.listeFav = await this.storage.get(FavoritesProvider.HISTORY_STORAGE_KEY) || [];
      console.log(this.listeFav);
      this.change.emit(this.listeFav);
    } catch (err) {
    }
  }

  public load() {
    this.change.emit(this.listeFav);
  }


}
