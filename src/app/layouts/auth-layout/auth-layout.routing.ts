import { Routes } from '@angular/router';
import { LoggedInAuthGuard } from 'src/app/shared/providers/auth/logged-in-auth.guard';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoggedInAuthGuard]
    }
];
