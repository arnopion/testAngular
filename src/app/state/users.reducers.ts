import { createReducer, on } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { ReportApiActions } from './users.actions';

export const usersFeatureKey = 'users';
export const initialState: ReadonlyArray<Rapport> = [];

export const reportsReducer = createReducer(
    initialState,
    on(ReportApiActions.retrieveReportListSuccess, (_state, { users }) => {
        return users;
    }),
);