import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';
import { reportsFeatureKey } from './users.reducers';

export const selectReports = createFeatureSelector<Array<Rapport>>(reportsFeatureKey);

export const selectReportById = (id: number) => createSelector(selectReports, (reports) => {
    return reports.find(report => report.id === id);
});