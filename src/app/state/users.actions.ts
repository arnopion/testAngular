import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../shared/model/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Add User': props<{ userId: string }>(),
    },
});

export const UserApiActions = createActionGroup({
    source: 'Users API',
    events: {
        'Retrieve User List': emptyProps(),
        'Retrieve User List Success': props<{ users: User[] }>(),
        'Retrieve User List Failure': props<{ errorMsg: string }>(),
    },
});