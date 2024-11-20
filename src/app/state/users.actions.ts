import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Rapport } from '../shared/model/report.model';

// export const UsersActions = createActionGroup({
//     source: 'Reports',
//     events: {
//         'Add Report': props<{ userId: string }>(),
//     },
// });

export const ReportApiActions = createActionGroup({
    source: 'Reports API',
    events: {
        'Retrieve Report List': emptyProps(),
        'Retrieve Report List Success': props<{ users: Rapport[] }>(),
        'Retrieve Report List Failure': props<{ errorMsg: string }>(),
    },
});