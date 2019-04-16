import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_GLOVES = '[gloveState] REQUEST_GET_ALL_GLOVES';
export const GET_GLOVE_SUCCESS = '[gloveState] GET_GLOVE_SUCCESS';
export const GET_GLOVE_ERROR = '[gloveState] GET_GLOVE_ERROR';
export const CLEAR_GLOVE_STATE = '[gloveState] CLEAR_GLOVE_STATE';

export class RequestGetAllGloves implements Action {
    type = REQUEST_GET_ALL_GLOVES;
    constructor() { }
}

export class GetGloveSuccess implements Action {
    type = GET_GLOVE_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetGloveError implements Action {
    type = GET_GLOVE_ERROR;
    constructor() { }
}

export class ClearGloveState implements Action {
    type = CLEAR_GLOVE_STATE;
    constructor() { }
}

export type GloveActions =
    | RequestGetAllGloves
    | GetGloveSuccess
    | GetGloveError
    | ClearGloveState;
