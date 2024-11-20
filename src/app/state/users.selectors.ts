import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { usersFeatureKey } from './users.reducers';

export const selectUsers = createFeatureSelector<Array<Rapport>>(usersFeatureKey);

export const selectUserById = (id: number) => createSelector(selectUsers, (users) => {
    return users.find(user => user.id === id);
});