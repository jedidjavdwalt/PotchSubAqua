import { AppState } from '../app.state';

export const rentalsBase = (state: AppState) => state.rentalsState;

export const rentals = (state: AppState) => rentalsBase(state).rentals;
export const selectedRental = (state: AppState) => rentalsBase(state).selectedRental;