// app.routes.ts (Route Configurations)
import { Routes, RouterModule } from '@angular/router';
import { PrivateLessonsComponent } from './private-lessons/private-lessons.component';
import {CallbackComponent} from './callback/callback.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'oauthCallback', redirectTo: '/home', pathMatch: 'full'},
    {path:'callback', component: CallbackComponent},
    { path: 'home', component:  PrivateLessonsComponent},
];
export const routing = RouterModule.forRoot(APP_ROUTES);