import { Action } from '@ngrx/store';

export const ADD_ALERT = '[alertsState] ADD_ALERT';
export const REMOVE_ALERT = '[alertsState] REMOVE_ALERT';

export class AddAlert implements Action {
    type = ADD_ALERT;
    constructor(public payload: string) {}
}

export class RemoveAlert implements Action {
    type = REMOVE_ALERT;
    constructor(public payload: string) {}
}

export type AlertsActions = 
    | AddAlert
    | RemoveAlert;
