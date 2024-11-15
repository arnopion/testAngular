import { createActionGroup, props } from '@ngrx/store';
import { User } from '../shared/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Add User': props<{ userId: string }>(),
    },
});

export const UserApiActions = createActionGroup({
    source: 'Users API',
    events: {
        'Retrieved User List': props<{ users: ReadonlyArray<User> }>(),
    },
});