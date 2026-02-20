import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    userData = { username: '', password: '' };

    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    onSubmit() {
        this.authService.register(this.userData).subscribe({
            next: () => {
                this.notificationService.show('Inscription réussie. Vous êtes maintenant connecté(e).', 'success');
                this.router.navigate(['/products']);
            },
            error: (err) => {
                if (err.status === 409) {
                    this.notificationService.show(err.error?.error || 'Ce nom d\'utilisateur existe déjà', 'danger');
                } else {
                    this.notificationService.show('Échec de l\'inscription', 'danger');
                }
            }
        });
    }
}
