import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.component.html',
})
export class PlayersDetailComponent implements OnInit {

  @Input() selectedPlayer: Player;
  @Input() isEditing: boolean;

  @Output() editClicked = new EventEmitter();

  constructor() { }

  onEditClick() {
    this.editClicked.emit();
  }

  ngOnInit() {
  }

}
