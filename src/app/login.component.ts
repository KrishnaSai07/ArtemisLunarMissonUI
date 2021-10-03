import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
import { loginCred } from './models';



@Component({
  selector: 'login-element',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  title = 'ArtemisLunarMissionsUI';

  showCreateAccount = false;

  username: string = '';

  password: string = '';

  create_username : string = '';

  create_password : string = '';

  create_email : string = '';

  message: string = '';

  constructor(private appService:AppService,private router:Router,private cookieService: CookieService)
  {

  }

  switchComponent()
  {
    this.message = null;
    this.showCreateAccount = !this.showCreateAccount;
  }  

  register()
  {

    this.message = null;
    
    if(this.create_email.length > 0 && this.create_username.length > 0 && this.create_password.length > 0)
    {
    this.appService.createAccount({
      username: this.create_username,
      password: this.create_password,
      email: this.create_email 
    }).subscribe(
      {
        next:(access)=>{
            console.log(access);
            if(access)
            {
              this.message = 'Your Account has been successfully created.Login here.';
              this.showCreateAccount = false;
              
            }
            else
            {
              this.message = 'Some issues have come up during registration. Please try regisration after sometime.';
              this.create_email = '';
              this.create_password = '';
              this.create_username = '';
            }

        },
        error: (error) =>{
            
        }   
    }
    )
    
    this.showCreateAccount = false;
    }
    else
    {
      this.message = " Some of the fields are missing. All fields are mandatory."
    }
  }

  login()
  {
      this.appService.credentialsCheck({
        username: this.username,
        password : this.password
      }).subscribe({
        next:(access)=>{
            console.log(access);
            if(access)
            {

              let base64StringUsername = btoa(this.username)

              this.cookieService.set('username',base64StringUsername);

              this.router.navigate(['myLogs']);
            }
            else
            {
              this.message = 'Please kindly check your login credentials again';
              this.username = '';
              this.password = '';
            }

        },
        error: (error) =>{
            
        }   
    });
  }

  cancelCreate()
  {
    this.message = '';
    this.showCreateAccount = false;
  }

}
