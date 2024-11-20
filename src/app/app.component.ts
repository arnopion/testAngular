import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from "./layout-template/layout/layout.component";
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  providers: [UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() { }

  // users$: Observable<readonly User[]> | undefined;
  // sidebarVisible = false;

  // constructor(private usersService: UsersService, private store: Store) { }

  // onAdd(userId: string) {
  //   this.store.dispatch(UsersActions.addUser({ userId }));
  // }

  // ngOnInit() {
  //   this.users$ = this.store.select(selectUsers);

  //   this.usersService
  //     .getUsers()
  //     .subscribe((users) =>
  //       this.store.dispatch(UserApiActions.retrievedUserList({ users }))
  //     );
  // }
}
