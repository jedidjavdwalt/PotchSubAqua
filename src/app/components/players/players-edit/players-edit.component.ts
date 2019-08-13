import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { FormBuilder } from '@angular/forms';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-players-edit',
  templateUrl: './players-edit.component.html',
  styleUrls: ['./players-edit.component.css']
})
export class PlayersEditComponent implements OnInit {

  @Input() selectedPlayer: Player;

  @Output() saveClicked = new EventEmitter();

  playerForm = this.formBuilder.group({
    status: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayersService,
  ) { }

  get status() {
    return this.playerForm.get('status');
  }

  onSaveClick() {
    if (!this.status.value) {
      this.saveClicked.emit();
      return;
    }

    const editedPlayer = this.selectedPlayer;

    editedPlayer.status = this.status.value;

    this.playerService.createPlayerToEdit(editedPlayer);

    this.playerForm.reset();

    this.saveClicked.emit();
  }

  ngOnInit() {
  }
}
