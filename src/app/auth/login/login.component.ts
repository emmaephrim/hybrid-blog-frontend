import { Component, inject, Inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    // '../../../../public/admin/vendor/fontawesome-free/css/all.min.css',
    // '../../../../public/admin/css/sb-admin-2.min.css',
  ],
})
export class LoginComponent {
  user: User = new User();
  userForm: FormGroup = new FormGroup({
    username: new FormControl(this.user.username, [Validators.required]),
    password: new FormControl(this.user.password, [Validators.required]),
    rememberMe: new FormControl(''),
  });

  authService: AuthService = inject(AuthService);
  constructor(private router: Router) {}

  handleSubmit() {
    this.user = this.userForm.value as User;

    this.authService.login(this.user).subscribe({
      next: (data: any) => {
        this.authService.storeToken(data.token);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error);
        alert('Invalid credentials');
      },
    });
  }
}
