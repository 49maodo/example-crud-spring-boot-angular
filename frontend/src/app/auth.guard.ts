import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        const roles = route.data['roles'] as Array<string>;
        if (roles) {
            const userRole = authService.getRole();
            if (userRole && roles.includes(userRole)) {
                return true;
            } else {
                router.navigate(['/']);
                return false;
            }
        }
        return true;
    }

    router.navigate(['/login']);
    return false;
};
