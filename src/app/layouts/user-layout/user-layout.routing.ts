import { LoggedInAuthGuard } from './../../shared/providers/auth/logged-in-auth.guard';
import { Routes } from '@angular/router';
import { Role } from 'src/app/shared/enums/roles.enum';
import { AuthenticationGuard } from 'src/app/shared/providers/auth/authentication.guard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NotLoggedInAuthGuard } from 'src/app/shared/providers/auth/not-logged-in.guard';

export const UserLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        canActivate: [NotLoggedInAuthGuard],
        component: DashboardComponent,
        data: { roles: [Role.Admin, Role.User] }
    },
    { path: 'user-profile', canActivate: [NotLoggedInAuthGuard], component: UserProfileComponent }
];
