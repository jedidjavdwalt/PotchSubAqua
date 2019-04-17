import { Action } from '@ngrx/store';

export const SELECT_TYPE = '[componentState] SELECT_TYPE';
export const CLEAR_COMPONENT_STATE = '[componentState] CLEAR_COMPONENT_STATE';

export class SelectType implements Action {
    type = SELECT_TYPE;
    constructor(public payload: string) { }
}

export class ClearComponentState implements Action {
    type = CLEAR_COMPONENT_STATE;
    constructor() { }
}

export type ComponentActions =
    | SelectType
    | ClearComponentState;
