import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_STICKS = '[stickState] REQUEST_GET_ALL_STICKS';
export const GET_STICK_SUCCESS = '[stickState] GET_STICK_SUCCESS';
export const GET_STICK_ERROR = '[stickState] GET_STICK_ERROR';
export const CLEAR_STICK_STATE = '[stickState] CLEAR_STICK_STATE';

export class RequestGetAllSticks implements Action {
    type = REQUEST_GET_ALL_STICKS;
    constructor() { }
}

export class GetStickSuccess implements Action {
    type = GET_STICK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetStickError implements Action {
    type = GET_STICK_ERROR;
    constructor() { }
}

export class ClearStickState implements Action {
    type = CLEAR_STICK_STATE;
    constructor() { }
}

export type StickActions =
    | RequestGetAllSticks
    | GetStickSuccess
    | GetStickError
    | ClearStickState;
