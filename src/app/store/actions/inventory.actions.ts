import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_ALL_MASKS = '[inventoryState] REQUEST_GET_ALL_MASKS';
export const REQUEST_GET_ALL_SNORKELS = '[inventoryState] REQUEST_GET_ALL_SNORKELS';
export const REQUEST_GET_ALL_GLOVES = '[inventoryState] REQUEST_GET_ALL_GLOVES';
export const REQUEST_GET_ALL_STICKS = '[inventoryState] REQUEST_GET_ALL_STICKS';
export const REQUEST_GET_ALL_FINS = '[inventoryState] REQUEST_GET_ALL_FINS';
export const GET_INVENTORY_ITEMS_SUCCESS = '[inventoryState] GET_INVENTORY_ITEMS_SUCCESS';

export const GET_SELECTED_INVENTORY_ITEM_SUCCESS = '[inventoryState] GET_SELECTED_INVENTORY_ITEM_SUCCESS';

export const CLEAR_INVENTORY_STATE = '[inventoryState] CLEAR_INVENTORY_STATE';

export class RequestGetAllMasks implements Action {
    type = REQUEST_GET_ALL_MASKS;
    constructor() { }
}

export class RequestGetAllSnorkels implements Action {
    type = REQUEST_GET_ALL_SNORKELS;
    constructor() { }
}

export class RequestGetAllGloves implements Action {
    type = REQUEST_GET_ALL_GLOVES;
    constructor() { }
}

export class RequestGetAllSticks implements Action {
    type = REQUEST_GET_ALL_STICKS;
    constructor() { }
}

export class RequestGetAllFins implements Action {
    type = REQUEST_GET_ALL_FINS;
    constructor() { }
}

export class GetInventoryItemSuccess implements Action {
    type = GET_INVENTORY_ITEMS_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class GetSelectedInventoryItemSuccess implements Action {
    type = GET_SELECTED_INVENTORY_ITEM_SUCCESS;
    constructor(public payload: InventoryItem) {}
}

export class ClearInventoryState implements Action {
    type = CLEAR_INVENTORY_STATE;
    constructor() { }
}

export type InventoryActions =
    | RequestGetAllMasks
    | RequestGetAllSnorkels
    | RequestGetAllGloves
    | RequestGetAllSticks
    | RequestGetAllFins
    | GetInventoryItemSuccess
    | GetSelectedInventoryItemSuccess
    | ClearInventoryState;
