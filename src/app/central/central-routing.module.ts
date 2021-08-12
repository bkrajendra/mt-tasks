import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'manage',
      pathMatch: 'full'
  },
  {//lazy loading other parts of projects [this will load modules containing task and status manager routes]
      path: 'manage',
      loadChildren: () => import('../manage/manage.module').then(m => m.ManageModule)
  },
  {// just to handle page-not-found issue.
      path: '**',
      component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralRoutingModule { }
