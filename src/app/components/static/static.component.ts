import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Rapport } from '../../shared/model/report.model';
import { ReportApiActions } from '../../state/reports.actions';
import { selectReportBlob, selectReportById, selectReportFeature, selectReportHtml, selectReportsList } from '../../state/reports.selectors';
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
  html$!: Observable<string | undefined>;
  htmlSub!: Subscription;

  htmlPages: string[] = [];

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
      this.store.dispatch(ReportApiActions.retrieveHtmlReportById({ reportId: report?.id || 1 }));
    });

    this.html$ = this.store.select(selectReportHtml);
    this.htmlSub = this.html$.subscribe(html => {
      this.htmlPages = this.splitIntoPages(html || '');
      console.log(this.htmlPages);      
    });
  }

  downloadPDF() {
    this.store.dispatch(ReportApiActions.downloadReportById({ reportId: 1 }));
    this.store.select(selectReportBlob).subscribe(blob => {
      if(!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'rapport.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  printPDF() {
    this.store.dispatch(ReportApiActions.printReportById({ reportId: 1 }));
  }

  generateCSV() {

  }

  private splitIntoPages(fullHtmlContent: string): string[] {
    const pageBreakMarker = '<div class="page-break"></div>';
    return fullHtmlContent.split(pageBreakMarker);
  }

  ngOnDestroy() {
    this.reportSub.unsubscribe();
  }
}
