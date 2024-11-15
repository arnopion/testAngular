import { createReducer, on } from '@ngrx/store';
import { User } from '../shared/user.model';
import { UserApiActions } from './users.actions';

export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
    initialState,
    on(UserApiActions.retrievedUserList, (_state, { users }) => users)
);