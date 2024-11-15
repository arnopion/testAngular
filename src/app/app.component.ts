import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectUsers } from './state/users.selectors';
import { UsersActions, UserApiActions } from './state/users.actions';
import { UsersService } from './state/users.service';
import { Observable } from 'rxjs';
import { User } from './shared/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  users$: Observable<readonly User[]> | undefined;

  constructor(private usersService: UsersService, private store: Store) { }

  onAdd(userId: string) {
    this.store.dispatch(UsersActions.addUser({ userId }));
  }

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);

    this.usersService
      .getUsers()
      .subscribe((users) =>
        this.store.dispatch(UserApiActions.retrievedUserList({ users }))
      );
  }
}
