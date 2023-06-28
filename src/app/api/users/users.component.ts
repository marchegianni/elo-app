import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private mysqlService: MysqlService) {}

  ngOnInit() {
    this.mysqlService.getAllPlayers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
