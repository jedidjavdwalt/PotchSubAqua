import { Action } from '@ngrx/store';
import { Player } from 'src/app/models/Player';

export const REQUEST_GET_PLAYERS_BY_GENDER = '[playersState] REQUEST_GET_PLAYERS_BY_GENDER';
export const REQUEST_GET_PLAYERS_BY_AGE_GROUP = '[playersState] REQUEST_GET_PLAYERS_BY_AGE_GROUP';
export const REQUEST_GET_ALL_PLAYERS = '[playersState] REQUEST_GET_ALL_PLAYERS';
export const GET_PLAYER_SUCCESS = '[playersState] GET_PLAYER_SUCCESS';

export const SET_SELECTED_PLAYER = '[playersState] SET_SELECTED_PLAYER';
export const CLEAR_SELECTED_PLAYER = '[playersState] CLEAR_SELECTED_PLAYER';

export const UNIMPLEMENTED_ACTION = '[playersState] UNIMPLEMENTED_ACTION';

export class RequestGetPlayersByGender implements Action {
    type = REQUEST_GET_PLAYERS_BY_GENDER;
    constructor(public gender: string, public ageGroup: string) { }
}

export class RequestGetPlayersByAgeGroup implements Action {
    type = REQUEST_GET_PLAYERS_BY_AGE_GROUP;
    constructor(public payload: string) { }
}

export class RequestGetAllPlayers implements Action {
    type = REQUEST_GET_ALL_PLAYERS;
    constructor() { }
}

export class GetPlayerSuccess implements Action {
    type = GET_PLAYER_SUCCESS;
    constructor(public payload: Player) { }
}

export class SetSelectedPlayer implements Action {
    type = SET_SELECTED_PLAYER;
    constructor(public payload: Player) { }
}

export class ClearSelectedPlayer implements Action {
    type = CLEAR_SELECTED_PLAYER;
    constructor() { }
}

export class UnimplementdAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor() { }
}

export type PlayersActions =
    | RequestGetPlayersByGender
    | RequestGetPlayersByAgeGroup
    | RequestGetAllPlayers
    | GetPlayerSuccess
    | SetSelectedPlayer
    | ClearSelectedPlayer
    | UnimplementdAction;
