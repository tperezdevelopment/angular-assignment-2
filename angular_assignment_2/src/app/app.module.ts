import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { AddJobComponent } from './views/components/add-job/add-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jobReducer } from './store/job.reduce';
import { JobEffects } from './store/job.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './views/components/header/header.component';
import { NavbarComponent } from './views/components/navbar/navbar.component';
import { JobSectionComponent } from './views/components/job-section/job-section.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginComponent } from './views/components/login/login.component';
import { RegisterComponent } from './views/components/register/register.component';
import { UserDropdownComponent } from './views/components/user-dropdown/user-dropdown.component';
import { AdminJobComponent } from './views/components/admin-job/admin-job.component';
import { SearchComponent } from './views/components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditJobComponent } from './views/components/edit-job/edit-job.component';
import { JobItemComponent } from './views/components/job-item/job-item.component';


@NgModule({
  declarations: [
    AppComponent,
    AddJobComponent,
    HeaderComponent,
    NavbarComponent,
    JobSectionComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserDropdownComponent,
    AdminJobComponent,
    SearchComponent,
    EditJobComponent,
    JobItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ jobs: jobReducer }),
    EffectsModule.forRoot([ JobEffects ]),
    NgbModule,
    BrowserAnimationsModule
   
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
