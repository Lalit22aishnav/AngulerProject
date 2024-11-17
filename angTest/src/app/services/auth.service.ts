// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environment'; // Corrected environment path

@Injectable({
  providedIn: 'root'
})      
export class AuthService {
  private authUrl = `${environment.apiUrl}/login`; // Your API endpoint
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<string | null> {
    return this.http.post<{ token: string }>(this.authUrl, { email, password }).pipe(
      switchMap(response => {
        this.tokenSubject.next(response.token);
        this.setToken(response.token);
        return this.token$;
      }),
      catchError((error) => {
        console.error('Login error:', error); // Improved error handling
        throw error; // Rethrow the error or handle it gracefully
      })
    );
  }

  setData(newValue:string) {
    this.tokenSubject.next(newValue);
  }

  // Logout method
  logout(): void {
    this.clearToken();
    this.tokenSubject.next(null);
  }

  // Store token in localStorage or sessionStorage
  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Get the token from localStorage
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Clear the token
  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Check if the user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
