import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reportes } from './reportes';

@NgModule({
  declarations: [
    Reportes,
  ],
  imports: [
    IonicPageModule.forChild(Reportes),
  ],
})
export class ReportesModule {}
