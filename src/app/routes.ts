import { Routes } from "@angular/router";
import { AuthGuard } from "./authGuard.service";
import { CheckSharedLogComponent } from "./checkSharedLog.component";
import { LoginComponent } from "./login.component";
import { PersonalLogsComponent } from "./personalLogs.component";
import { PostLogsComponent } from "./postLogs.component";
import { PublicLogsComponent } from "./publicLogs.component";
import { SharedToComponent } from "./sharedTo.component";
import { ShareLogComponent } from "./shareLog.component";
import { ViewLogsComponent } from "./viewLogs.component";
import { ViewPublicLogsComponent } from "./viewPublicLogs.component";



export const artemisRoutes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'myLogs',component:PersonalLogsComponent,canActivate: [AuthGuard]},
    {path:'viewLogs/:id',component:ViewLogsComponent,canActivate: [AuthGuard]},
    {path:'postLogs',component:PostLogsComponent,canActivate: [AuthGuard]},
    {path:'publicLogs',component:PublicLogsComponent,canActivate: [AuthGuard]},
    {path:'publicLogs/:id',component:ViewPublicLogsComponent,canActivate: [AuthGuard]},
    {path:'sharedLogs',component:SharedToComponent,canActivate: [AuthGuard]},
    {path:'share/:id',component:ShareLogComponent,canActivate: [AuthGuard]},
    {path:'sharedLog/:id',component:CheckSharedLogComponent,canActivate: [AuthGuard]}
]