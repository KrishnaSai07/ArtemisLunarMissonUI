import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

@Component({
  selector: 'share-log',
  templateUrl: './shareLog.component.html',
  styleUrls: ['./app.component.css']
})
export class ShareLogComponent implements OnInit{
  title = 'ArtemisLunarMissionsUI';

  username: string = '';

  email: string = '';

  message: string = '';  

  logId: string = '';  

  constructor(private appService:AppService,private cookieService: CookieService,private router:ActivatedRoute,private navRoute:Router)
  {

  }

  ngOnInit()
  {
      this.logId = this.router.snapshot.params['id']
      console.log(this.logId);
      console.log(this.appService.convertbase64ToString(this.cookieService.get('username')))
      
  }

  confirm()
  {
    this.appService.shareLogWithOthers({
        email: this.email,
        id: this.logId
    }).subscribe({
      next:(data)=>{
          console.log(this.appService.convertbase64ToString(this.cookieService.get('username')))
          console.log(data);
          if(data)
          {
              this.navRoute.navigate(["/myLogs"]);
          }
          else
          {
              this.message = "Something went wrong. Please try again."
          }
      },
      error: (error) =>{
          this.message = "Something went wrong. Please try relogging into the account and check again."
      }
  }) 
  }

  cancel()
  {
    this.username = '';
    this.email = '';
  }
}
