import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';

// export const ReportsActions = createActionGroup({
//     source: 'Reports',
//     events: {
//         'Add Report': props<{ reportId: string }>(),
//     },
// });

export const ReportApiActions = createActionGroup({
    source: 'Reports API',
    events: {
        'Retrieve Report List': emptyProps(),
        'Retrieve Report List Success': props<{ reports: Rapport[] }>(),
        'Retrieve Report List Failure': props<{ errorMsg: string }>(),
    },
});