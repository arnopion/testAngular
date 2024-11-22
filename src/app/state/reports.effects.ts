import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReportApiActions } from './reports.actions';
import { ReportsService } from '../shared/services/report.service';

export const loadReportsList = createEffect(
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

export const downloadReportById = createEffect(
    (actions$ = inject(Actions), reportsService = inject(ReportsService)) => {
        return actions$.pipe(
            ofType(ReportApiActions.downloadReportById),
            exhaustMap(({ reportId }) =>
                reportsService.downloadReport(reportId).pipe(
                    map((blob) => ReportApiActions.downloadReportByIdSuccess({ blob })),
                    catchError((error: { message: string }) =>
                        of(ReportApiActions.downloadReportByIdFailure({ errorMsg: error.message }))
                    )
                )
            )
        );
    },
    { functional: true }
)

export const displayErrorAlertDownload = createEffect(
    () => {
        return inject(Actions).pipe(
            ofType(ReportApiActions.downloadReportByIdFailure),
            tap(({ errorMsg }) => alert(errorMsg))
        );
    },
    { functional: true, dispatch: false }
);

export const loadHtmlReportById = createEffect(
    (actions$ = inject(Actions), reportsService = inject(ReportsService)) => {
        return actions$.pipe(
            ofType(ReportApiActions.retrieveHtmlReportById),
            exhaustMap(({ reportId }) =>
                reportsService.getHtmlReport(reportId).pipe(
                    map((html) => ReportApiActions.retrieveHtmlReportByIdSuccess({ html })),
                    catchError((error: { message: string }) =>
                        of(ReportApiActions.retrieveHtmlReportByIdFailure({ errorMsg: error.message }))
                    )
                )
            )
        );
    },
    { functional: true }
);

export const displayErrorAlertHtml = createEffect(
    () => {
        return inject(Actions).pipe(
            ofType(ReportApiActions.retrieveHtmlReportByIdFailure),
            tap(({ errorMsg }) => alert(errorMsg))
        );
    },
    { functional: true, dispatch: false }
);