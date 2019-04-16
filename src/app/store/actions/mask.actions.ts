import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_MASKS = '[maskState] REQUEST_GET_ALL_MASKS';
export const GET_MASK_SUCCESS = '[maskState] GET_MASK_SUCCESS';
export const GET_MASK_ERROR = '[maskState] GET_MASK_ERROR';
export const CLEAR_MASK_STATE = '[maskState] CLEAR_MASK_STATE';

export class RequestGetAllMasks implements Action {
    type = REQUEST_GET_ALL_MASKS;
    constructor() { }
}

export class GetMaskSuccess implements Action {
    type = GET_MASK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetMaskError implements Action {
    type = GET_MASK_ERROR;
    constructor() { }
}

export class ClearMaskState implements Action {
    type = CLEAR_MASK_STATE;
    constructor() { }
}

export type MaskActions =
    | RequestGetAllMasks
    | GetMaskSuccess
    | GetMaskError
    | ClearMaskState;
