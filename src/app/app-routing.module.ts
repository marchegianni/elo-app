import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiModule } from './api/api.module';

const routes: Routes = [
  {
    path: 'api',
    loadChildren: () => import('./api/api.module').then((m) =>m.ApiModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
