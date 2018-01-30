import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiaList } from './noticia-list';

@NgModule({
  declarations: [
    NoticiaList,
  ],
  imports: [
    IonicPageModule.forChild(NoticiaList),
  ],
})
export class NoticiaListModule {}
