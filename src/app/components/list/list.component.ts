import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/model/user.model';
import { UsersActions, UserApiActions } from '../../state/users.actions';
import { selectUserById, selectUsers } from '../../state/users.selectors';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users$!: Observable<User[]>;
  user$!: Observable<User | undefined>;

  constructor(private store: Store) { }

  onAdd(userId: string) {
    this.store.dispatch(UsersActions.addUser({ userId }));
  }

  ngOnInit() {
    this.store.dispatch(UserApiActions.retrieveUserList());
    // this.user$ = this.store.select(selectUserById(1));

    this.users$ = this.store.select(selectUsers).pipe(
      map(users => users || [])
    );
  }
}
