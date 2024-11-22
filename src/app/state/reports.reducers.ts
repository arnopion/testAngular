import { createReducer, on } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { ReportApiActions } from './reports.actions';

export const reportsFeatureKey = 'Reporting';
export interface ReportsState {
    reports: Rapport[];
}
export const initialState: ReportsState = {
    reports: [] as Rapport[],
};

export const reportsReducer = createReducer(
    initialState,
    on(ReportApiActions.retrieveReportListSuccess, (_state, { reports }) => {
        return { ..._state, reports };
    }),
);