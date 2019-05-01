import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayersService } from 'src/app/services/players/players.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.css']
})
export class PlayersAddComponent implements OnInit {

  newPlayer = {} as Player;
  newBirtDate = null;

  // @Output() playerToAdd = new EventEmitter<Player>();

  constructor(
    private playersService: PlayersService,
  ) { }

  addClicked() {
    alert(this.playersService.createPlayerToAdd(this.newBirtDate, this.newPlayer));
    this.newPlayer = {} as Player;
    this.newBirtDate = null;

    // this.playerToAdd.emit(this.newPlayer);
  }

  ngOnInit() {
  }

}
