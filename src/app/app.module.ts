import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login.component';
import { PersonalLogsComponent } from './personalLogs.component';
import { PostLogsComponent } from './postLogs.component';
import { PublicLogsComponent } from './publicLogs.component';
import { artemisRoutes } from './routes';
import { ViewLogsComponent } from './viewLogs.component';
import { ViewPublicLogsComponent } from './viewPublicLogs.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './authGuard.service';
import { ShareLogComponent } from './shareLog.component';
import { SharedToComponent } from './sharedTo.component';
import { CheckSharedLogComponent } from './checkSharedLog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonalLogsComponent,
    HeaderComponent,
    ViewLogsComponent,
    PostLogsComponent,
    PublicLogsComponent,
    ViewPublicLogsComponent,
    ShareLogComponent,
    SharedToComponent,
    CheckSharedLogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(artemisRoutes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AppService,CookieService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
