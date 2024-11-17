import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordLength: number = 3;
  errorMessage: String = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(this.passwordLength)]]
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated())
      this.router.navigate(['/dashboard']); // Redirect on successful login
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).subscribe(
        () => {

          this.router.navigate(['/dashboard']); // Redirect on successful login
        },
        (error) => {
          this.errorMessage = 'Invalid login credentials'; // Show error message
          this.cdRef.detectChanges();
        }
      );

    }
  }
}