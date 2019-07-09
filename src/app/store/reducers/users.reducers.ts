import * as actions from '../actions/users.actions';

export const initialUsersState = {
    loggedInUser: null,
};

export function usersReducer(state = initialUsersState, action: actions.UsersActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.GET_USER:
            newState.loggedInUser = null;
            return newState;

        case actions.SET_USER:
            const getUserSuccessAction = action as actions.SetUser;
            newState.loggedInUser = getUserSuccessAction.payload;
            return newState;

        case actions.REMOVE_USER:
            newState.loggedInUser = null;
            return newState;

        default:
            return state;
    }
}
