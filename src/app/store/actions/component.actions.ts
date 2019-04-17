import { Action } from '@ngrx/store';

export const ADD_PLAYERS = '[componentState] ADD_PLAYERS';
export const ADD_PLAYERS_SUCCESS = '[componentState] ADD_PLAYERS_SUCCESS';

export const ADD_INVENTORY = '[componentState] ADD_INVENTORY';
export const ADD_INVENTORY_SUCCESS = '[componentState] ADD_INVENTORY_SUCCESS';

export const ADD_RENTALS = '[componentState] ADD_RENTALS';
export const ADD_RENTALS_SUCCESS = '[componentState] ADD_RENTALS_SUCCESS';

export const CLEAR_COMPONENT_STATE = '[componentState] CLEAR_COMPONENT_STATE';

export class AddPlayers implements Action {
    type = ADD_PLAYERS;
    constructor() { }
}

export class AddPlayersSuccess implements Action {
    type = ADD_PLAYERS_SUCCESS;
    constructor() { }
}

export class AddInventory implements Action {
    type = ADD_INVENTORY;
    constructor() { }
}

export class AddInventorySuccess implements Action {
    type = ADD_INVENTORY_SUCCESS;
    constructor() { }
}

export class AddRentals implements Action {
    type = ADD_RENTALS;
    constructor() { }
}

export class AddRentalsSuccess implements Action {
    type = ADD_RENTALS_SUCCESS;
    constructor() { }
}

export class ClearComponentState implements Action {
    type = CLEAR_COMPONENT_STATE;
    constructor() { }
}

export type ComponentActions =
    | AddPlayers
    | AddPlayersSuccess
    | AddInventory
    | AddInventorySuccess
    | AddRentals
    | AddRentalsSuccess
    | ClearComponentState;
