import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import {FavoritesProvider} from "../../providers/favorites/favorites";
import { Storage } from '@ionic/Storage';
import { ActionSheetController } from 'ionic-angular';
import {mediasToCSVBase64, mediasToJsonBase64} from "../../app/utils/utils";
import {download} from "../../utils/utils";
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from "@ionic-native/file-path";
import { File } from '@ionic-native/file';





/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  items: any[] = [];
  filepath: string;
  resolvedFilePath : string;
  fileContent: string;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              public socialSharing: SocialSharing,
              private fileChooser: FileChooser,
              private filePath: FilePath,
              private file: File,
              private favoritePrivider: FavoritesProvider) {
  }
  ionViewWillEnter(){
    this.storage.get(FavoritesProvider.HISTORY_STORAGE_KEY).then(text => {
      this.items = text
    });

  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Export JSON',
          handler: () => {
            this.shareFavorites('JSON');
          }
        },
        {
          text: 'Export CSV',
          handler: () => {
            this.shareFavorites('CSV');

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  shareFavorites(format) {
    if(this.platform.is('core')) {
      if (format === 'CSV') {
        download('favoris.csv', mediasToCSVBase64(this.items));
      } else {
        console.log(this.items.toString());
        download('favoris.json', mediasToJsonBase64(this.items));
      }
    } else {
      if (format === 'CSV') {
        this.socialSharing.share('Look, this is my favorites movies and series !', 'Export my favorites', mediasToCSVBase64(this.items))
      } else {
        console.log(this.items);
        this.storage.set('items',JSON.stringify(this.items));
        this.socialSharing.share("Voici ma liste de favoris JSON !", "Mes favoris", mediasToJsonBase64(this.items));
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }


  public async fileOpener(){
    this.fileChooser.open()
      .then(uri => this.filepath = uri)
      .catch(e => console.log(e));
    console.info(this.filepath);
    if(this.platform.is('android')) {
      this.filePath.resolveNativePath(this.filepath).then(ok => this.resolvedFilePath = ok).catch(e => console.log(e));

      let path = this.resolvedFilePath.substring(0, this.resolvedFilePath.lastIndexOf('/'));
      let file = this.resolvedFilePath.substring(this.resolvedFilePath.lastIndexOf('/') + 1, this.resolvedFilePath.length);
      this.file.readAsText(path,file).then(data => this.fileContent = data).catch(e => console.log(e));
      this.importData(this.fileContent)
    }
  }
  private importData(data: string) {
    try {
      const imdbIDs = JSON.parse(data);
      imdbIDs.forEach((imdbID: string) => {
        this.favoritePrivider.storage.set('keystor',JSON.stringify(imdbID));
        console.log('imdb',JSON.stringify(imdbID));


      });
    } catch (e) {
    }
  }


}
