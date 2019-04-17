import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_MASKS = '[inventoryState] REQUEST_GET_ALL_MASKS';
export const GET_MASK_SUCCESS = '[inventoryState] GET_MASK_SUCCESS';

export const REQUEST_GET_ALL_SNORKELS = '[inventoryState] REQUEST_GET_ALL_SNORKELS';
export const GET_SNORKEL_SUCCESS = '[inventoryState] GET_SNORKEL_SUCCESS';

export const REQUEST_GET_ALL_GLOVES = '[inventoryState] REQUEST_GET_ALL_GLOVES';
export const GET_GLOVE_SUCCESS = '[inventoryState] GET_GLOVE_SUCCESS';

export const REQUEST_GET_ALL_STICKS = '[inventoryState] REQUEST_GET_ALL_STICKS';
export const GET_STICK_SUCCESS = '[inventoryState] GET_STICK_SUCCESS';

export const REQUEST_GET_ALL_FINS = '[inventoryState] REQUEST_GET_ALL_FINS';
export const GET_FINS_SUCCESS = '[inventoryState] GET_FINS_SUCCESS';

export const CLEAR_INVENTORY_STATE = '[inventoryState] CLEAR_MASK_STATE';

export class RequestGetAllMasks implements Action {
    type = REQUEST_GET_ALL_MASKS;
    constructor() { }
}

export class GetMaskSuccess implements Action {
    type = GET_MASK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAllSnorkels implements Action {
    type = REQUEST_GET_ALL_SNORKELS;
    constructor() { }
}

export class GetSnorkelSuccess implements Action {
    type = GET_SNORKEL_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAllGloves implements Action {
    type = REQUEST_GET_ALL_GLOVES;
    constructor() { }
}

export class GetGloveSuccess implements Action {
    type = GET_GLOVE_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAllSticks implements Action {
    type = REQUEST_GET_ALL_STICKS;
    constructor() { }
}

export class GetStickSuccess implements Action {
    type = GET_STICK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAllFins implements Action {
    type = REQUEST_GET_ALL_FINS;
    constructor() { }
}

export class GetFinsSuccess implements Action {
    type = GET_FINS_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class ClearInventoryState implements Action {
    type = CLEAR_INVENTORY_STATE;
    constructor() { }
}

export type InventoryActions =
    | RequestGetAllMasks
    | GetMaskSuccess
    | RequestGetAllSnorkels
    | GetSnorkelSuccess
    | RequestGetAllGloves
    | GetGloveSuccess
    | RequestGetAllSticks
    | GetStickSuccess
    | RequestGetAllFins
    | GetFinsSuccess
    | ClearInventoryState;
