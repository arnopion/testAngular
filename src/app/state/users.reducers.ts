import { createReducer, on } from '@ngrx/store';
import { User } from '../shared/model/user.model';
import { UserApiActions } from './users.actions';

export const usersFeatureKey = 'users';
export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
    initialState,
    on(UserApiActions.retrieveUserListSuccess, (_state, { users }) => {
        return users;
    }),
);