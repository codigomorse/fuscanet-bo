import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosTiempo } from './usuarios-tiempo';

@NgModule({
  declarations: [
    UsuariosTiempo,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosTiempo),
  ],
})
export class UsuariosTiempoModule {}
