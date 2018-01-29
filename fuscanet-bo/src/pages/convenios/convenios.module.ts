import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Convenios } from './convenios';

@NgModule({
  declarations: [
    Convenios,
  ],
  imports: [
    IonicPageModule.forChild(Convenios),
  ],
})
export class ConveniosModule {}
