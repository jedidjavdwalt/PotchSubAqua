import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.component.html',
  styleUrls: ['./players-detail.component.css']
})
export class PlayersDetailComponent implements OnInit {

  @Input() selectedPlayer: Player;

  constructor() { }

  ngOnInit() {
  }

}