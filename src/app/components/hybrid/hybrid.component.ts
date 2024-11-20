import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Rapport } from '../../shared/model/report.model';
import { ReportApiActions } from '../../state/reports.actions';
import { selectReportById, selectReports } from '../../state/reports.selectors';
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
  selector: 'app-hybrid',
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
  templateUrl: './hybrid.component.html',
  styleUrl: './hybrid.component.scss'
})
export class HybridComponent {
  reports$!: Observable<Rapport[]>;
  report$!: Observable<Rapport | undefined>;
  loading: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(ReportApiActions.retrieveReportList());
    // this.report$ = this.store.select(selectReportById(1));

    this.reports$ = this.store.select(selectReports).pipe(
      map(reports => reports || [])
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

  generateCSV() {
    // Select the table body
    const tableBody = document.querySelector('p-table tbody');

    if (!tableBody) {
      console.error('Table body not found');
      return;
    }

    // Extract data from the table rows
    const rows = Array.from(tableBody.querySelectorAll('tr')).map(row =>
      Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() || '')
    );

    // Extract headers from the table
    const tableHeader = document.querySelector('p-table thead');
    const headers = tableHeader
      ? Array.from(tableHeader.querySelectorAll('th')).map(th => th.textContent?.trim() || '')
      : [];

    // Prepare CSV content
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(',')) // Add double quotes to handle special characters
      .join('\n');

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'list-of-reports.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
