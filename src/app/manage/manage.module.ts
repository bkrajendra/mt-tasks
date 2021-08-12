import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageStatusComponent } from './manage-status/manage-status.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { UsedMatModules } from '../central/mat-modules';
import { FormsModule } from '@angular/forms';

// Manage Module to  manage Tasks and Task states
// With two componenets manage-tasks and manage-status
// manage-taks - fascilitate task creation, listing and updating
// manage-status - status update by simple drog-drop

@NgModule({
  declarations: [
    ManageStatusComponent,
    ManageTasksComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    UsedMatModules, // needed for importing required material modules into manage-module
    FormsModule // for handling forms
  ]
})
export class ManageModule { }
