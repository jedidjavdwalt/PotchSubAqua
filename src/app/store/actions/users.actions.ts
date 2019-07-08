import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const REQUEST_GET_USER = '[usersState] REQUEST_GET_USER';
export const GET_USER_SUCCESS = '[usersState] GET_USER_SUCCESS';

export const UNIMPLEMENTED_ACTION = '[usersState] UNIMPLEMENTED_ACTION';

export class RequestGetUser implements Action {
    type = REQUEST_GET_USER;
    constructor(public payload: string) { }
}

export class GetUserSuccess implements Action {
    type = GET_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor() { }
}

export type UsersActions =
    | RequestGetUser
    | GetUserSuccess
    | UnimplementedAction;

