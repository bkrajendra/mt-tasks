import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'manage',
      pathMatch: 'full'
  },
  {
      path: 'manage',
      loadChildren: () => import('../manage/manage.module').then(m => m.ManageModule)
  },
  {
      path: '**',
      component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralRoutingModule { }
