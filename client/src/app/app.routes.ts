// app.routes.ts (Route Configurations)
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);