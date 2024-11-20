import { createReducer, on } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { ReportApiActions } from './reports.actions';

export const reportsFeatureKey = 'reports';
export const initialState: ReadonlyArray<Rapport> = [];

export const reportsReducer = createReducer(
    initialState,
    on(ReportApiActions.retrieveReportListSuccess, (_state, { reports }) => {
        return reports;
    }),
);