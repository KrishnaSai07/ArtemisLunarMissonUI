import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './app.service';
import { saveAs } from '../../node_modules/file-saver'

@Component({
  selector: 'view-log',
  templateUrl: './viewPublicLogs.component.html',
  styleUrls:['app.component.css']
})
export class ViewPublicLogsComponent implements OnInit{
  title = 'ArtemisLunarMissionsUI';
  
  uploadFile: File = null;

  logId: string = '';

  logDetail : any = {}

  downloadFiles : any=[]  

  downloadURL : any = null

  accessOptions = ['Private','Public']

  logsData: any = null;
  
  message: string = '';

  showLink : boolean = false;

  constructor(private router:ActivatedRoute,private appService:AppService)
  {

  }

  close()
  {
      this.showLink = false;
  }

  ngOnInit()
  {
      this.logId = this.router.snapshot.params['id']
      
      this.appService.getPublicPostsById({
          id: this.logId
      }).subscribe({
        next:(data)=>{
            console.log(data);
            if(data.length > 0)
            {

                this.logsData = data[0];
                this.adjustDownloads();
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

  adjustDownloads()
  {
    if(this.logsData.files.length > 0)  
    {  
    this.downloadFiles = this.logsData.files.split(",");
    }
    else
    {
        this.downloadFiles = null;
    }
  }

  download(val)
  {
      console.log(val);
      
      let fileName = this.downloadFiles[val];

      console.log(fileName);

      this.appService.downloadFiles(fileName).subscribe({
        next:(data)=>{

            console.log(data instanceof Blob);

            saveAs(data,fileName);
            
            
        },
        error: (error) =>{
            this.message = "Something went wrong. Please try relogging into the account and check again."
        }
    }) 

  }  


}
