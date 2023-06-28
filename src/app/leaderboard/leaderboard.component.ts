import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  players: any[] = [];

  constructor(private mysqlService: MysqlService) {}

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.mysqlService.getAllPlayers().subscribe(
      (data) => {
        this.players = data;
        console.log('Players:', this.players);
      },
      (error) => {
        console.error('Error retrieving players:', error);
      }
    );
  }
}
