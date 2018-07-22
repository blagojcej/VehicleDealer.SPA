import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    debugger;
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile()
      .subscribe(res => console.log(res));
  }

}
