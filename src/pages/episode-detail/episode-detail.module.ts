import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodeDetailPage } from './episode-detail';

@NgModule({
  declarations: [
    EpisodeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodeDetailPage),
  ],
})
export class EpisodeDetailPageModule {}
