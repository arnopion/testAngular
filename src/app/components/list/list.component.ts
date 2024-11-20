import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Rapport } from '../../shared/model/user.model';
import { UsersActions, UserApiActions } from '../../state/users.actions';
import { selectUserById, selectUsers } from '../../state/users.selectors';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TooltipModule, 
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users$!: Observable<Rapport[]>;
  user$!: Observable<Rapport | undefined>;
  loading: boolean = false;

  constructor(private store: Store) { }

  onAdd(userId: string) {
    this.store.dispatch(UsersActions.addUser({ userId }));
  }

  testt($event: any){
    console.log($event);
  }

  ngOnInit() {
    this.store.dispatch(UserApiActions.retrieveUserList());
    // this.user$ = this.store.select(selectUserById(1));

    this.users$ = this.store.select(selectUsers).pipe(
      map(users => users || [])
    );
  }

  generatePDF() {
    // Select the table body element
    const tableBody = document.querySelector('p-table tbody');

    if (!tableBody) {
      console.error('Table body not found');
      return;
    }

    // Extract data from the table rows
    const rows = Array.from(tableBody.querySelectorAll('tr')).map(row =>
      Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() || '')
    );

    // Extract header from table
    const tableHeader = document.querySelector('p-table thead');
    const headers = tableHeader
      ? Array.from(tableHeader.querySelectorAll('th')).map(th => th.textContent?.trim() || '')
      : [];

    // create & save pdf
    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [headers],
      body: rows,
    });
    pdf.save('liste-de-liste.pdf');
  }
}
