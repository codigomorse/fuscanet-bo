import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvenioList } from './convenio-list';

@NgModule({
  declarations: [
    ConvenioList,
  ],
  imports: [
    IonicPageModule.forChild(ConvenioList),
  ],
})
export class ConvenioListModule {}
