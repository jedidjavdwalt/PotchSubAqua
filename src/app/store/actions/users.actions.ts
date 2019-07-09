import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const LOGIN_USER = '[usersState] LOGIN_USER';
export const GET_USER = '[usersState] GET_USER';
export const SET_USER = '[usersState] SET_USER';

export const LOGOUT_USER = '[usersState] LOGOUT_USER';
export const REMOVE_USER = '[usersState] REMOVE_USER';

export const UNIMPLEMENTED_ACTION = '[usersState] UNIMPLEMENTED_ACTION';

export class LoginUser implements Action {
    type = LOGIN_USER;
    constructor() { }
}

export class GetUser implements Action {
    type = GET_USER;
    constructor(public payload: string) { }
}

export class SetUser implements Action {
    type = SET_USER;
    constructor(public payload: User) { }
}

export class LogoutUser implements Action {
    type = LOGOUT_USER;
    constructor() { }
}

export class RemoveUser implements Action {
    type = REMOVE_USER;
    constructor() { }
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor() { }
}

export type UsersActions =
    | LoginUser
    | GetUser
    | SetUser
    | LogoutUser
    | RemoveUser
    | UnimplementedAction;

