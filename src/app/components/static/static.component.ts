import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Rapport } from '../../shared/model/report.model';
import { ReportApiActions } from '../../state/reports.actions';
import { selectReportById, selectReportFeature, selectReportsList } from '../../state/reports.selectors';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

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
    InputTextModule,
    DialogModule
  ],
  templateUrl: './static.component.html',
  styleUrl: './static.component.scss'
})
export class StaticComponent {
  reports$!: Observable<Rapport[]>;
  report$!: Observable<Rapport | undefined>;
  reportSub!: Subscription;
  loading: boolean = false;
  visible: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(ReportApiActions.retrieveReportList());
    this.reports$ = this.store.select(selectReportsList).pipe(
      map(reports => reports || [])
    );

    this.report$ = this.store.select(selectReportById(1));
    this.reportSub = this.report$.subscribe(report => {

    });
  }

  generatePDF() {
    
  }

  generateCSV() {

  }

  ngOnDestroy() {
    this.reportSub.unsubscribe();
  }
}
