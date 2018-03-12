import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasLeidasDetalle } from './noticias-leidas-detalle';

@NgModule({
  declarations: [
    NoticiasLeidasDetalle,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasLeidasDetalle),
  ],
})
export class NoticiasLeidasDetalleModule {}
