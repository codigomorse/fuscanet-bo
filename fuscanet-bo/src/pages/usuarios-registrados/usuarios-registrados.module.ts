import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosRegistrados } from './usuarios-registrados';

@NgModule({
  declarations: [
    UsuariosRegistrados,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosRegistrados),
  ],
})
export class UsuariosRegistradosModule {}
