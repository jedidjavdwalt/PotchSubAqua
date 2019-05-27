import { Action } from '@ngrx/store';
import { Rental } from 'src/app/models/Rental';

export const REQUEST_GET_RENTALS_BY_ACTION_REQUIRED = '[rentalsState] REQUEST_GET_RENTALS_BY_ACTION_REQUIRED';
export const REQUEST_GET_RENTALS_BY_TYPE = '[rentalsState] REQUEST_GET_RENTALS_BY_TYPE';
export const GET_RENTAL_SUCCESS = '[rentalsState] GET_RENTAL_SUCCESS';

export const SET_SELECTED_RENTAL = '[rentalsState] SET_SELECTED_RENTAL';
export const CLEAR_SELECTED_RENTAL = '[rentalsState] CLEAR_SELECTED_RENTAL';

export const UNIMPLEMENTED_ACTION = '[rentalsState] UNIMPLEMENTED_ACTION';

export class RequestGetRentalsByActionRequired implements Action {
    type = REQUEST_GET_RENTALS_BY_ACTION_REQUIRED;
    constructor(public payload: string) { }
}

export class RequestGetRentalsByType implements Action {
    type = REQUEST_GET_RENTALS_BY_TYPE;
    constructor(public payload: string) { }
}

export class GetRentalSuccess implements Action {
    type = GET_RENTAL_SUCCESS;
    constructor(public payload: Rental) { }
}

export class SetSelectedRental implements Action {
    type = SET_SELECTED_RENTAL;
    constructor(public payload: Rental) { }
}

export class ClearSelectedRental implements Action {
    type = CLEAR_SELECTED_RENTAL;
    constructor() { }
}

export class UnimplementedAction implements Action {
    type = UNIMPLEMENTED_ACTION;
    constructor() { }
}

export type RentalsActions =
    | RequestGetRentalsByActionRequired
    | RequestGetRentalsByType
    | GetRentalSuccess
    | SetSelectedRental
    | ClearSelectedRental
    | UnimplementedAction;
