import { createReducer, on } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { ReportApiActions } from './reports.actions';

export const reportsFeatureKey = 'Reporting';
export interface ReportsState {
    reports: Rapport[];
    html: string;
    blob: Blob | null;
}
export const initialState: ReportsState = {
    reports: [] as Rapport[],
    html: '',
    blob: null,
};

export const reportsReducer = createReducer(
    initialState,
    on(ReportApiActions.retrieveReportListSuccess, (_state, { reports }) => {
        return { ..._state, reports };
    }),
    on(ReportApiActions.retrieveHtmlReportByIdSuccess, (_state, { html }) => {
        return { ..._state, html };
    }),
    on(ReportApiActions.downloadReportByIdSuccess, (_state, { blob }) => {
        return { ..._state, blob };
    })
);