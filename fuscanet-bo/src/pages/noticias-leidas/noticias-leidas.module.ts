import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasLeidas } from './noticias-leidas';

@NgModule({
  declarations: [
    NoticiasLeidas,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasLeidas),
  ],
})
export class NoticiasLeidasModule {}
