import { createSelector, createFeatureSelector } from '@ngrx/store';
import { reportsFeatureKey, ReportsState } from './reports.reducers';

export const selectReportFeature = createFeatureSelector<ReportsState>(reportsFeatureKey);

export const selectReportsList = createSelector(
    selectReportFeature,
    (state: ReportsState) => {
        return state.reports
    }
);

export const selectReportById = (id: number) => createSelector(selectReportFeature, (state: ReportsState) => {
    return state.reports.find(report => report.id === id);
});