import { Routes } from '@angular/router';
import path from 'path';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { ListadoComponent } from './pages/listado/listado.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'entrada', pathMatch:'full'
    },
    {path:'entrada', component:EntradaComponent},
    {path:'listado', component:ListadoComponent}
];
