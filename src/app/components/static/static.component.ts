import { Component } from '@angular/core';
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

@Component({
  selector: 'app-static',
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
  templateUrl: './static.component.html',
  styleUrl: './static.component.scss'
})
export class StaticComponent {
  reports$!: Observable<Rapport[]>;
  report$!: Observable<Rapport | undefined>;
  loading: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(ReportApiActions.retrieveReportList());
    this.report$ = this.store.select(selectReportById(1));

    this.reports$ = this.store.select(selectReports).pipe(
      map(reports => reports || [])
    );
  }

  generatePDF() {
    
  }

  generateCSV() {

  }
}
