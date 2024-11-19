import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../shared/user.model';
import { usersFeatureKey } from './users.reducers';

export const selectUsers = createFeatureSelector<Array<User>>(usersFeatureKey);

export const selectUserById = createSelector(
    selectUsers,
    (users: Array<User>, id: string) => {      
        return users.find(user => user.id === id);
    }
);