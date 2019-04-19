import { Action } from '@ngrx/store';
import { Player } from 'src/app/models/Player';

export const REQUEST_GET_PLAYERS_BY_GENDER = '[playersState] REQUEST_GET_PLAYERS_BY_GENDER';
export const REQUEST_GET_PLAYERS_BY_AGE_GROUP = '[playersState] REQUEST_GET_PLAYERS_BY_AGE_GROUP';
export const GET_PLAYER_SUCCESS = '[playersState] GET_PLAYER_SUCCESS';

export const GET_SELECTED_PLAYER_SUCCESS = '[playersState] GET_SELECTED_PLAYER_SUCCESS';

export const CLEAR_PLAYERS_STATE = '[playersState] CLEAR_PLAYERS_STATE';

export class RequestGetPlayersByGender implements Action {
    type = REQUEST_GET_PLAYERS_BY_GENDER;
    constructor(public gender: string, public ageGroup: string) { }
}

export class RequestGetPlayersByAgeGroup implements Action {
    type = REQUEST_GET_PLAYERS_BY_AGE_GROUP;
    constructor(public payload: string) { }
}

export class GetPlayerSuccess implements Action {
    type = GET_PLAYER_SUCCESS;
    constructor(public payload: Player) { }
}

export class GetSelectedPlayerSuccess implements Action {
    type = GET_SELECTED_PLAYER_SUCCESS;
    constructor(public payload: Player) { }
}

export class ClearPlayersState implements Action {
    type = CLEAR_PLAYERS_STATE;
    constructor() { }
}

export type PlayersActions =
    | RequestGetPlayersByGender
    | RequestGetPlayersByAgeGroup
    | GetPlayerSuccess
    | GetSelectedPlayerSuccess
    | ClearPlayersState;
