import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralRoutingModule } from './central-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsedMatModules } from './mat-modules';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskApiService } from './services/task-api.service';

//Central Module aims to manage antire project routing through this module
//All services common to project are intitalise here.
//This modules loads first while other parts of projects are lazy loaded from router.

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    CentralRoutingModule, // Central Module Router
    UsedMatModules, // Angular Material Modules 
    HttpClientModule // httpmodule for to be used in task-api service
  ],
  exports: [
    // These two componenets need to be exported to made available in app module/componenet.
    HeaderComponent, FooterComponent
  ],
  providers: [
    TaskApiService //task-api service provisioned.
  ]
})
export class CentralModule { }
