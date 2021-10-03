import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { element } from 'protractor';
import { AppService } from './app.service';

@Component({
  selector: 'view-log',
  templateUrl: './viewLogs.component.html',
  styleUrls:['./app.component.css']
})
export class ViewLogsComponent implements OnInit{
  title = 'ArtemisLunarMissionsUI';
  
  sharedWith : boolean = false;  

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

  logAccess: string = '';

  postTime: string = '';

  constructor(private cookieService: CookieService,private router:ActivatedRoute,private appService:AppService,private routerNav:Router)
  {

  }

  ngOnInit()
  {
      this.logId = this.router.snapshot.params['id']
      // need to fetch this value from the cookie
      
      this.username = this.appService.convertbase64ToString(this.cookieService.get("username"));
      
        console.log(this.logId);

      this.appService.getPostsById({
          username: this.username,
          id: this.logId
      }).subscribe({
        next:(data)=>{
            this.tempLogData = data[0];
            console.log(data[0].access);
            this.logAccess = data[0].access;
            this.subject = data[0].subject;
            this.context = data[0].context;
            this.postTime = data[0].postTime;
            if(this.logAccess == 'Private')
            {
                this.sharedWith = true;
            }    
            if(data[0].files.includes(","))
            {
                this.downloadFiles = data[0].files.split(",");
            }
            else
            {
                console.log(data[0].files);
                this.downloadFiles.push(data[0].files);
            }

            this.tempDownloadFiles = this.downloadFiles
        },
        error: (error) =>{
            this.message = "Something went wrong. Please try relogging into the account and check again."
        }
    });
      
  }

  ChangeValue(event)
  {
      console.log(event.target.value);
      this.logAccess = event.target.value;
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

  upload(event)
  {
    this.uploadFile = event.target.files[0];
  }

  cancel()
  {
        this.downloadFiles = this.tempDownloadFiles;
        this.subject = this.tempLogData.subject;
        this.context = this.tempLogData.context;
        this.logAccess = this.tempLogData.access;
        this.postTime = this.tempLogData.postTime;
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
        
        this.appService.updatePosts({
             id: this.logId,
             username: this.username,
             subject : this.subject,
             context : this.context,
             access : this.logAccess,
             files: allFiles,
             postTime : newTimestampLog  
        }).subscribe({
            next:(data)=>{
                    if(data)
                    {
                            console.log("Saved the info");
                            this.routerNav.navigate(["/myLogs"])
                    }
                    else
                    {
                        console.log("Issues with updating");
                        this.message = "Something went wrong. Please try relogging into the account and check updating post again."
                    }
            },
            error: (error) =>{
                this.message = "Something went wrong. Please try relogging into the account and check again."
            }
        })
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

}
