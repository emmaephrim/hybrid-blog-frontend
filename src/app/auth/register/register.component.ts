import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject, inject } from '@angular/core';
import { User } from '../../model/user';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    // '../../../../public/admin/vendor/fontawesome-free/css/all.min.css',
    // '../../../../public/admin/css/sb-admin-2.min.css',
  ],
})
export class RegisterComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('bg-dark', 'bg-gradient');
    }
  }

  user: User = new User();
  userForm: FormGroup = new FormGroup(
    {
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.user.email, [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator }
  );

  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      // document.body.style.backgroundColor = '#5a5c69';
      document.body.classList.add('bg-dark', 'bg-gradient');
    }
  }

  public handleRegister() {
    this.user = this.userForm.value as User;
    this.authService.signup(this.user).subscribe((result: any) => {
      alert(`${result.message}`);
      this.router.navigate(['/login']);
    });
  }
}
