import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';

    private currenstUserSubject = new BehaviorSubject<{ username: string, role: string } | null>(null);
    public currentUser$ = this.currenstUserSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const role = localStorage.getItem('role');
            if (token && username && role) {
                this.currenstUserSubject.next({ username, role });
            }
        }
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('token', response.jwt);
                    localStorage.setItem('username', response.username);
                    localStorage.setItem('role', response.role);
                }
                this.currenstUserSubject.next({ username: response.username, role: response.role });
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData).pipe(
            tap((response: any) => {
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('token', response.jwt);
                    localStorage.setItem('username', response.username);
                    localStorage.setItem('role', response.role);
                }
                this.currenstUserSubject.next({ username: response.username, role: response.role });
            })
        );
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
        }
        this.currenstUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem('token');
        }
        return null;
    }

    getRole(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem('role');
        }
        return null;
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    isAdmin(): boolean {
        return this.getRole() === 'ROLE_ADMIN';
    }
}
