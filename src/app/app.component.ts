import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from "./layout/layout.component";
import { ReportsService } from './shared/services/report.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  providers: [ReportsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() { }
}
