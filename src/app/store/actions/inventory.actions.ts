import { Action } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const REQUEST_GET_INVENTORY_ITEMS_BY_STATUS = '[inventoryState] REQUEST_GET_INVENTORY_ITEMS_BY_STATUS';
export const REQUEST_GET_INVENTORY_ITEMS_BY_TYPE = '[inventoryState] REQUEST_GET_INVENTORY_ITEMS_BY_TYPE';
export const GET_INVENTORY_ITEM_SUCCESS = '[inventoryState] GET_INVENTORY_ITEM_SUCCESS';

export const SET_SELECTED_INVENTORY_ITEM = '[inventoryState] SET_SELECTED_INVENTORY_ITEM';
export const CLEAR_SELECTED_INVENTORY_ITEM = '[inventoryState] CLEAR_SELECTED_INVENTORY_ITEM';

export const REQUEST_GET_AVAILABLE_MASKS = '[inventoryState] REQUEST_GET_AVAILABLE_MASKS';
export const GET_AVAILABLE_MASK_SUCCESS = '[inventoryState] GET_AVAILABLE_MASKS_SUCCESS';

export const REQUEST_GET_AVAILABLE_SNORKELS = '[inventoryState] REQUEST_GET_AVAILABLE_SNORKELS';
export const GET_AVAILABLE_SNORKEL_SUCCESS = '[inventoryState] GET_AVAILABLE_SNORKELS_SUCCESS';

export const REQUEST_GET_AVAILABLE_GLOVES = '[inventoryState] REQUEST_GET_AVAILABLE_GLOVES';
export const GET_AVAILABLE_GLOVE_SUCCESS = '[inventoryState] GET_AVAILABLE_GLOVES_SUCCESS';

export const REQUEST_GET_AVAILABLE_STICKS = '[inventoryState] REQUEST_GET_AVAILABLE_STICKS';
export const GET_AVAILABLE_STICK_SUCCESS = '[inventoryState] GET_AVAILABLE_STICKS_SUCCESS';

export const REQUEST_GET_AVAILABLE_FINS = '[inventoryState] REQUEST_GET_AVAILABLE_FINS';
export const GET_AVAILABLE_FINS_SUCCESS = '[inventoryState] GET_AVAILABLE_FINS_SUCCESS';

export const UNIMPLEMENTED_ACTION = '[inventoryState] UNIMPLEMENTED_ACTION';

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

export class SetSelectedInventoryItem implements Action {
    type = SET_SELECTED_INVENTORY_ITEM;
    constructor(public payload: InventoryItem) { }
}

export class ClearSelectedInventoryItem implements Action {
    type = CLEAR_SELECTED_INVENTORY_ITEM;
    constructor() { }
}

export class RequestGetAvailableMasks implements Action {
    type = REQUEST_GET_AVAILABLE_MASKS;
    constructor() { }
}

export class GetAvailableMaskSuccess implements Action {
    type = GET_AVAILABLE_MASK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAvailableSnorkels implements Action {
    type = REQUEST_GET_AVAILABLE_SNORKELS;
    constructor() { }
}

export class GetAvailableSnorkelSuccess implements Action {
    type = GET_AVAILABLE_SNORKEL_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAvailableGloves implements Action {
    type = REQUEST_GET_AVAILABLE_GLOVES;
    constructor() { }
}

export class GetAvailableGloveSuccess implements Action {
    type = GET_AVAILABLE_GLOVE_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAvailableSticks implements Action {
    type = REQUEST_GET_AVAILABLE_STICKS;
    constructor() { }
}

export class GetAvailableStickSuccess implements Action {
    type = GET_AVAILABLE_STICK_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class RequestGetAvailableFins implements Action {
    type = REQUEST_GET_AVAILABLE_FINS;
    constructor() { }
}

export class GetAvailableFinsSuccess implements Action {
    type = GET_AVAILABLE_FINS_SUCCESS;
    constructor(public payload: InventoryItem) { }
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor() { }
}

export type InventoryActions =
    | RequestGetInventoryItemsByStatus
    | RequestGetInventoryItemsByType
    | GetInventoryItemSuccess
    | SetSelectedInventoryItem
    | ClearSelectedInventoryItem
    | RequestGetAvailableMasks
    | GetAvailableMaskSuccess
    | RequestGetAvailableSnorkels
    | GetAvailableSnorkelSuccess
    | RequestGetAvailableGloves
    | GetAvailableGloveSuccess
    | RequestGetAvailableSticks
    | GetAvailableStickSuccess
    | RequestGetAvailableFins
    | GetAvailableFinsSuccess
    | UnimplementedAction;
