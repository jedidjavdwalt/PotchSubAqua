import { Action } from '@ngrx/store';
import { Rental } from 'src/app/models/Rental';

export const REQUEST_GET_RENTALS_BY_ACTION_REQUIRED = '[rentalsState] REQUEST_GET_RENTALS_BY_ACTION_REQUIRED';
export const REQUEST_GET_RENTALS_BY_TYPE = '[rentalsState] REQUEST_GET_RENTALS_BY_TYPE';
export const GET_RENTAL_SUCCESS = '[rentalsState] GET_RENTAL_SUCCESS';

export const GET_SELECTED_RENTAL_SUCCESS = '[rentalsState] GET_SELECTED_RENTAL_SUCCESS';

export const CLEAR_RENTALS_STATE = '[rentalsState] CLEAR_RENTALS_STATE';

export class RequestGetRentalsByActionRequired implements Action {
    type = REQUEST_GET_RENTALS_BY_ACTION_REQUIRED;
    constructor(public payload: string) {}
}

export class RequestGetRentalsByType implements Action {
    type = REQUEST_GET_RENTALS_BY_TYPE;
    constructor(public payload: string) {}
}

export class GetRentalSuccess implements Action {
    type = GET_RENTAL_SUCCESS;
    constructor(public payload: Rental) {}
}

export class GetSelectedRentalSuccess implements Action {
    type = GET_SELECTED_RENTAL_SUCCESS;
    constructor(public payload: Rental) {}
}

export class ClearRentalsState implements Action {
    type = CLEAR_RENTALS_STATE;
    constructor() {}
}

export type RentalsActions =
    | RequestGetRentalsByActionRequired
    | RequestGetRentalsByType
    | GetRentalSuccess
    | GetSelectedRentalSuccess
    | ClearRentalsState;
