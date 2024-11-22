import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Rapport } from '../model/report.model';

@Injectable({ providedIn: 'root' })
export class ReportsService {
    constructor(private http: HttpClient) { }

    printReport(reportId: number) {
        return this.http.get('http://localhost:8080/api/v1/flyingsaucer/print/' + reportId);
    }

    downloadReport(reportId: number) {
        return this.http.get('http://localhost:8080/api/v1/flyingsaucer/pdf/' + reportId, { responseType: 'blob' });
    }
    
    getReports(): Observable<Array<Rapport>> {
        return this.http.get<Rapport[]>('http://localhost:8080/api/v1/reports');
    }

    getHtmlReport(reportId: number) {
        return this.http.get('http://localhost:8080/api/v1/flyingsaucer/html/' + reportId, { responseType: 'text' });
    }
}