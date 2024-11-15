import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../shared/user.model';

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');

export const selectUserById = createSelector(
    selectUsers,
    (users: ReadonlyArray<User>, id: string) => users.find(user => user.id === id)
);