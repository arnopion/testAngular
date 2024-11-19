import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { StaticComponent } from './components/static/static.component';
import { HybridComponent } from './components/hybrid/hybrid.component';

export const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'static', component: StaticComponent },
    { path: 'hybrid', component: HybridComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', redirectTo: '/list' },
];