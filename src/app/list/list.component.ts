import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[];

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(result => this.users = result);
  }

}
