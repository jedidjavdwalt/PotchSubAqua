import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_INVENTORY_ITEMS_BY_STATUS = '[inventoryState] REQUEST_GET_INVENTORY_ITEMS_BY_STATUS';
export const REQUEST_GET_INVENTORY_ITEMS_BY_TYPE = '[inventoryState] REQUEST_GET_INVENTORY_ITEMS_BY_TYPE';
export const GET_INVENTORY_ITEM_SUCCESS = '[inventoryState] GET_INVENTORY_ITEM_SUCCESS';

export const GET_SELECTED_INVENTORY_ITEM_SUCCESS = '[inventoryState] GET_SELECTED_INVENTORY_ITEM_SUCCESS';

export const CLEAR_INVENTORY_STATE = '[inventoryState] CLEAR_INVENTORY_STATE';

export class RequestGetInventoryItemsByStatus implements Action {
    type = REQUEST_GET_INVENTORY_ITEMS_BY_STATUS;
    constructor(public payload: string) { }
}

export class RequestGetInventoryItemsByType implements Action {
    type = REQUEST_GET_INVENTORY_ITEMS_BY_TYPE;
    constructor(public payload: string) { }
}

export class GetInventoryItemSuccess implements Action {
    type = GET_INVENTORY_ITEM_SUCCESS;
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
    | RequestGetInventoryItemsByStatus
    | RequestGetInventoryItemsByType
    | GetInventoryItemSuccess
    | GetSelectedInventoryItemSuccess
    | ClearInventoryState;
