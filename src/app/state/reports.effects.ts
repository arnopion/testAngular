import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReportApiActions } from './reports.actions';
import { ReportsService } from '../shared/services/report.service';

export const loadActors = createEffect(
    (actions$ = inject(Actions), reportsService = inject(ReportsService)) => {
        return actions$.pipe(
            ofType(ReportApiActions.retrieveReportList),
            exhaustMap(() =>
                reportsService.getReports().pipe(
                    map((reports) => ReportApiActions.retrieveReportListSuccess({ reports })),
                    catchError((error: { message: string }) =>
                        of(ReportApiActions.retrieveReportListFailure({ errorMsg: error.message }))
                    )
                )
            )
        );
    },
    { functional: true }
);

export const displayErrorAlert = createEffect(
    () => {
        return inject(Actions).pipe(
            ofType(ReportApiActions.retrieveReportListFailure),
            tap(({ errorMsg }) => alert(errorMsg))
        );
    },
    { functional: true, dispatch: false }
);