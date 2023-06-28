import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../services/mysql.service';
import { Observer } from 'rxjs';
import { PlayerElo } from '../interfaces/player-elo.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  players: any[] = [];
  winner1: PlayerElo = { id:0, elo:0};
  winner2: PlayerElo = { id:0, elo:0};
  loser1: PlayerElo = { id:0, elo:0};
  loser2: PlayerElo = { id:0, elo:0};
  
  constructor(private mysqlService: MysqlService) {};

  ngOnInit() {
    this.getPlayers();
  }
  getPlayers() {
    const observer: Observer<any> = {
      next: (data) => {
        // Handle the next value emitted by the observable
        this.players = [{ id: '', username: 'Select User' }, ...data];
        console.log('Next:', this.players);
      },
      error: (error) => {
        // Handle any errors that occur
        console.error('Error retrieving users:', error);
      },
      complete: () => {
        // Handle the completion of the observable (optional)
        console.log('Complete');
      }
    };

    this.mysqlService.getAllPlayers().subscribe(observer);
  }
  saveEntries() {
    const difference = (this.loser1.elo + this.loser2.elo) - (this.winner1.elo + this.winner2.elo);
    const ratio = difference / 400;
    const expected_result = 1 / (Math.pow(10, ratio) + 1);
    const K_factor = 16;
    const elo_change = Math.round(K_factor*(1 - expected_result));
    const gameResult = {
      winner1: this.winner1.id,
      winner2: this.winner2.id,
      loser1: this.loser1.id,
      loser2: this.loser2.id,
      elo_change: elo_change
    };

    const observer: Observer<any> = {
      next: (data) => {
        // Handle the next value emitted by the observable
        console.log('Game result saved successfully:', data);
        // Reset the selected values after saving
        this.winner1 = { id:0, elo:0};
        this.winner2 = { id:0, elo:0};
        this.loser1 = { id:0, elo:0};
        this.loser2 = { id:0, elo:0};
      },
      error: (error) => {
        // Handle any errors that occur
        console.error('Error saving game result:', error);
      },
      complete: () => {
        // Handle the completion of the observable (optional)
        console.log('Complete');
      }
    };

    this.mysqlService.saveGameResult(gameResult).subscribe(observer);
  }
}
