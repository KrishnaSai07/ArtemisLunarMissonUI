import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

@Component({
  selector: 'post-logs',
  templateUrl: './postLogs.component.html',
  styleUrls:['./postLogs.component.css']
})
export class PostLogsComponent implements OnInit{
  title = 'ArtemisLunarMissionsUI';

  message : string = '';  

  uploadFile: File = null;

  logId: string = '';

  username : string = '';

  downloadFiles : any=[]; 

  tempDownloadFiles:any=[];

  tempLogData : any = null;

  accessOptions = ['Private','Public']

  subject : string = '';

  context: string = '';

  logAccess: string = 'Private';

  postTime: string = '';

  logTimestamp : string = null;

  email: string = '';

  constructor(private router:ActivatedRoute,private appService:AppService,private routerNav:Router,private cookieService:CookieService)
  {
        this.logTimestamp = new Date().toString();
  }

  ngOnInit()
  {
      this.username = this.appService.convertbase64ToString(this.cookieService.get('username'));
      this.email = 'leonard.Hofstader@gmail.com';
  }

  cancel()
  {
      this.subject = '';
      this.context = '';
      this.logAccess = 'Private';
      this.downloadFiles = null;      
  }

  upload(event)
  {
    this.uploadFile = event.target.files[0];
  }

  uploadClick()
  {
    if(this.uploadFile)
    {
    const formData = new FormData();
        
    formData.append("upload", this.uploadFile);

    this.appService.uploadFile(formData).subscribe({
        next:(data)=>{
            if(data)
            {
                this.downloadFiles.push(this.uploadFile.name);
            }
            else
            {
                this.message = "The file upload wasnt complete.Please try again."
            }
        },
        error: (error) =>{
            this.message = "Something went wrong. Please try relogging into the account and check again."
        }
    });

    }
  }

  save()
  {
    console.log("Save works");
    let allFiles = '';
    let lengthAllFiles = 0;

    if(this.downloadFiles.length > 0)
    {
    this.downloadFiles.forEach((element)=>{
        allFiles = allFiles + element + ",";
    });
    lengthAllFiles = allFiles.length -1;
    allFiles = allFiles.substring(0,lengthAllFiles)
    }
    else
    {
        allFiles = null
    }

    let timestampLog = new Date();

    let newTimestampLog = timestampLog.toISOString().substring(0,10) +" "+timestampLog.toISOString().substring(11,19);
        this.appService.savePosts(
            {
                subject: this.subject,
                context: this.context,
                access: this.logAccess,
                username: this.username,
                email: this.email,
                files: allFiles,
                postTime: newTimestampLog
            }
        ).subscribe({
            next:(data)=>{
                    if(data)
                    {
                            console.log("Saved the info");
                            this.routerNav.navigate(["/myLogs"])
                    }
                    else
                    {
                        console.log("Issues with saving");
                        this.message = "Something went wrong. Please try relogging into the account and check posting log again."
                    }
            },
            error: (error) =>{
                this.message = "Something went wrong. Please try relogging into the account and check again."
            }
        });
  }

  delete(val)
  {
      let i = 0;
      let temp = []
      this.downloadFiles.forEach(element => {
          if(i != val)
          {
            temp.push(element);
            i = i + 1
          }
          else
          {
              i = i + 1;
          }
      });
    
      this.downloadFiles = temp;

  }
  
  ChangeValue(event)
  {
      console.log(event.target.value);
      this.logAccess = event.target.value;
  }

}
