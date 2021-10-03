import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

@Component({
  selector: 'shareTo-element',
  templateUrl: './sharedTo.component.html',
  styleUrls: ['./sharedTo.component.css']
})
export class SharedToComponent implements OnInit{
  title = 'ArtemisLunarMissionsUI';

  username : string = '';  

  sharedLogs : any = []

  filteredLogData: any = []  

  p: number = 0
  
  searchData: string = '';

  fromDate: string = '1990-01-01';

  toDate: string = '2022-01-01';

  message : string = '';
  
  getIds : any = [];

  getAllPosts : any = []

  constructor(private appService:AppService,private router:Router,private cookieService:CookieService)
  {
      
  }  


  ngOnInit()
  {
        this.appService.getSharedIds({
            username: this.appService.convertbase64ToString(this.cookieService.get('username'))
        }).subscribe({
            next:(data)=>{
                console.log(data);
                this.getIds = data[0].shareLogIds.split(",");
                console.log(this.getIds);

                this.appService.getAllPosts().subscribe({
                    next:(data)=>{
                        console.log(data);

                        this.getAllPosts = data;
                        let tempLogs = [];
                        this.getAllPosts.forEach(element => {
                            this.getIds.forEach(ele => {
                                if(ele == element.id)
                                {
                                    tempLogs.push(element)
                                }
                            });
                        });    
                        this.sharedLogs = tempLogs;
                        console.log(this.sharedLogs);    

                        this.filteredLogData = this.sharedLogs;
                        this.dataDisplayAdjusts();
                    },
                    error: (error) =>{
                        this.message = "Something went wrong. Please try relogging into the account and check again."
                    }
                }

                );
               
            },
            error: (error) =>{
                this.message = "Something went wrong. Please try relogging into the account and check again."
            }
        })
  }

  dataDisplayAdjusts()
    {
        this.filteredLogData.forEach(element => {
            if(element.context != null)
            {
                if(element.context.length > 85)
               {
                    element.context = element.context.substring(0,80) + " ........";
               }
           }
           else
           {
               element.context = "(empty)"
           }
           if(element.subject != null)
            {
                if(element.subject.length > 55)
               {
                    element.subject = element.subject.substring(0,80) + " ........";
               }
           }
           else
           {
               element.context = "(empty)"
           }


        });
    }
  
    filter()
    {
        console.log(this.searchData);
        console.log(this.fromDate);
        console.log(this.toDate);
        let temp : any = []
        this.filteredLogData.forEach(element => {
            if(element.subject.includes(this.searchData) || element.context.includes(this.searchData))
            {
                let subStringDate = new Date(element.postTime.substring(0,10));

                if(subStringDate >= new Date(this.fromDate) && subStringDate <= new Date(this.toDate))
                {
                    temp.push(element);
                }
            }
        });

        console.log(temp);

        this.filteredLogData = temp;
    }

    clear()
    {
        this.searchData = '';
        this.filteredLogData  = this.sharedLogs;
        this.fromDate = '1990-01-01';
        this.toDate = '2022-01-01';
    }


}
