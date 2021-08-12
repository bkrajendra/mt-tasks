import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStatusComponent } from './manage-status/manage-status.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-task',
    pathMatch: 'full'
  },
  {
    path: 'manage-task',
    component: ManageTasksComponent
  },
  {
    path: 'manage-status',
    component: ManageStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
