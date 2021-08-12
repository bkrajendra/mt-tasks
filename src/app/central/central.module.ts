import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralRoutingModule } from './central-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsedMatModules } from './mat-modules';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskApiService } from './services/task-api.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    CentralRoutingModule,
    UsedMatModules,
    HttpClientModule
  ],
  exports: [
    HeaderComponent, FooterComponent
  ],
  providers: [
    TaskApiService
  ]
})
export class CentralModule { }
