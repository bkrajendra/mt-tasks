import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageStatusComponent } from './manage-status/manage-status.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { UsedMatModules } from '../central/mat-modules';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageStatusComponent,
    ManageTasksComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    UsedMatModules,
    FormsModule
  ]
})
export class ManageModule { }
