import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosEspecialidad } from './usuarios-especialidad';

@NgModule({
  declarations: [
    UsuariosEspecialidad,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosEspecialidad),
  ],
})
export class UsuariosEspecialidadModule {}
