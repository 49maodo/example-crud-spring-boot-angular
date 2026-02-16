import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../notification.service';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})
export class NotificationComponent {
    toasts$;

    constructor(private notificationService: NotificationService) {
        this.toasts$ = this.notificationService.toasts$;
    }

    remove(toast: Toast) {
        this.notificationService.remove(toast);
    }
}
