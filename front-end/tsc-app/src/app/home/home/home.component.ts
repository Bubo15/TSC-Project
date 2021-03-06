import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = this.authService.isLogged$;
  limit: number = 4;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

  }

  logoutHandler(){
    this.authService.logout();
  }
}
