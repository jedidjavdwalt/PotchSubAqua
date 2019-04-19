import { AppState } from '../app.state';

export const rentalsBase = (state: AppState) => state.rentalState;

export const rentals = (state: AppState) => rentalsBase(state).rentals;
export const selectedRental = (state: AppState) => rentalsBase(state).selectedRental;

