import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiActions } from './users.actions';
import { UsersService } from '../shared/services/report.service';

export const loadActors = createEffect(
    (actions$ = inject(Actions), usersService = inject(UsersService)) => {
        return actions$.pipe(
            ofType(UserApiActions.retrieveUserList),
            exhaustMap(() =>
                usersService.getReports().pipe(
                    map((users) => UserApiActions.retrieveUserListSuccess({ users })),
                    catchError((error: { message: string }) =>
                        of(UserApiActions.retrieveUserListFailure({ errorMsg: error.message }))
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
            ofType(UserApiActions.retrieveUserListFailure),
            tap(({ errorMsg }) => alert(errorMsg))
        );
    },
    { functional: true, dispatch: false }
);