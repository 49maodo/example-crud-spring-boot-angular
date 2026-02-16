import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    message: string;
    type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') {
        const currentToasts = this.toastsSubject.value;
        const newToast: Toast = { message, type };
        this.toastsSubject.next([...currentToasts, newToast]);

        setTimeout(() => {
            this.remove(newToast);
        }, 3000);
    }

    remove(toast: Toast) {
        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next(currentToasts.filter(t => t !== toast));
    }
}
