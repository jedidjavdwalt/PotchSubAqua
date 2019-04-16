import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_SNORKELS = '[snorkelState] REQUEST_GET_ALL_SNORKELS';
export const GET_SNORKEL_SUCCESS = '[snorkelState] GET_SNORKEL_SUCCESS';
export const GET_SNORKEL_ERROR = '[snorkelState] GET_SNORKEL_ERROR';
export const CLEAR_SNORKEL_STATE = '[snorkelState] CLEAR_SNORKEL_STATE';

export class RequestGetAllSnorkels implements Action {
    type = REQUEST_GET_ALL_SNORKELS;
    constructor() { }
}

export class GetSnorkelSuccess implements Action {
    type = GET_SNORKEL_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetSnorkelError implements Action {
    type = GET_SNORKEL_ERROR;
    constructor() { }
}

export class ClearSnorkelState implements Action {
    type = CLEAR_SNORKEL_STATE;
    constructor() { }
}

export type SnorkelActions =
    | RequestGetAllSnorkels
    | GetSnorkelSuccess
    | GetSnorkelError
    | ClearSnorkelState;
