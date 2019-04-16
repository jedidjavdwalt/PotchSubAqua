import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_FINS = '[finsState] REQUEST_GET_ALL_FINS';
export const GET_FINS_SUCCESS = '[finsState] GET_FINS_SUCCESS';
export const GET_FINS_ERROR = '[finsState] GET_FINS_ERROR';
export const CLEAR_FINS_STATE = '[finsState] CLEAR_FINS_STATE';

export class RequestGetAllFins implements Action {
    type = REQUEST_GET_ALL_FINS;
    constructor() { }
}

export class GetFinsSuccess implements Action {
    type = GET_FINS_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetFinsError implements Action {
    type = GET_FINS_ERROR;
    constructor() { }
}

export class ClearFinsState implements Action {
    type = CLEAR_FINS_STATE;
    constructor() { }
}

export type FinsActions =
    | RequestGetAllFins
    | GetFinsSuccess
    | GetFinsError
    | ClearFinsState;
