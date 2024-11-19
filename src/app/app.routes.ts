import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { StaticComponent } from './components/static/static.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'static', component: StaticComponent },
];
