import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './publicLogs.component.html',
  styleUrls: ['./publicLogs.component.css']
})
export class PublicLogsComponent implements OnInit{
  
    p: number = 0;

    message: string = '';

    fromDate: string = '1990-01-01';

    toDate: string = '2022-01-01';

    searchData : string = "";

    filteredLogData: any =[];

    publicLogsData : any = [];

    constructor(private appService:AppService)
    {

    }

     ngOnInit()
     {
         this.appService.getPublicPosts().subscribe(
            {
                next:(data)=>{
                    if(data.length > 0)
                    {
                        this.publicLogsData = data;
                        this.filteredLogData = this.publicLogsData;
                        this.displayAdjusts();

                    }
                    
                },
                error: (error) =>{
                    this.message = "Something went wrong. Please try relogging into the account and check again."
                }
            }
         );
         
     }

     displayAdjusts()
     {
        this.filteredLogData.forEach(element => {
            if(element.context != null)
            {
                if(element.context.length > 80)
               {
                    element.context = element.context.substring(0,80) + " ........";
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
        this.filteredLogData  = this.publicLogsData;
        this.fromDate = '1990-01-01';
        this.toDate = '2022-01-01';
    }
    
}
