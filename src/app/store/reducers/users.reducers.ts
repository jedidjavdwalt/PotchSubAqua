import * as actions from '../actions/users.actions';

export const initialUsersState = {
    loggedInUser: null,
};

export function usersReducer(state = initialUsersState, action: actions.UsersActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.REQUEST_GET_USER:
            newState.loggedInUser = null;
            return newState;

        case actions.GET_USER_SUCCESS:
            const getUserSuccessAction = action as actions.GetUserSuccess;
            newState.loggedInUser = getUserSuccessAction.payload;
            return newState;

        default:
            return state;
    }
}
