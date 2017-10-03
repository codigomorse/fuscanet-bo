import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNoticia } from './add-noticia';

@NgModule({
  declarations: [
    AddNoticia,
  ],
  imports: [
    IonicPageModule.forChild(AddNoticia),
  ],
})
export class AddNoticiaModule {}
