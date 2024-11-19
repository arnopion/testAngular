import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/user.model';
import { UsersActions, UserApiActions } from '../../state/users.actions';
import { selectUsers } from '../../state/users.selectors';
import { UsersService } from '../../state/users.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'], // Fixed typo here
})
export class ListComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private usersService: UsersService, private store: Store) { }

  onAdd(userId: string) {
    this.store.dispatch(UsersActions.addUser({ userId }));
  }

  ngOnInit() {
    this.users$ = this.store.select(selectUsers).pipe(
      map(users => users || [])
    )

    this.usersService
      .getUsers()
      .subscribe((users) =>
        this.store.dispatch(UserApiActions.retrievedUserList({ users }))
      );
  }
}
