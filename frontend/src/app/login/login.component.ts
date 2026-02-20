import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials = { username: '', password: '' };

    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    onSubmit() {
        this.authService.login(this.credentials).subscribe({
            next: () => {
                this.notificationService.show('Connexion réussie', 'success');
                this.router.navigate(['/products']);
            },
            error: (err) => {
                this.notificationService.show('Nom d\'utilisateur ou mot de passe incorrect', 'danger');
            }
        });
    }
}
