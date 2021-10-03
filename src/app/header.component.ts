import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'header-element',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'ArtemisLunarMissionsUI';

  constructor(private cookieService: CookieService,private router:Router)
  {

  }

  logout()
  {
      this.cookieService.deleteAll();
      this.router.navigate(["/login"]);
      console.log("Logout");
  }


}
