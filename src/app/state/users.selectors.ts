import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../shared/user.model';

export const selectUsers = createFeatureSelector<Array<User>>('users');

export const selectUserById = createSelector(
    selectUsers,
    (users: Array<User>, id: string) => users.find(user => user.id === id)
);