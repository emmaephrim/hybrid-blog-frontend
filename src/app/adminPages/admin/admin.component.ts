import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../post-form/post-form.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    IndexComponent,
    PostFormComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.css',
    // '../../../../public/admin/css/sb-admin-2.min.css',
    // '../../../../public/admin/vendor/fontawesome-free/css/all.min.css',
  ],
})
export class AdminComponent {
  authService: AuthService = inject(AuthService);
  copyRightYear = new Date().getFullYear();

  constructor(private router: Router) {}

  logout = () => {
    this.authService.logout();
    // this.router.navigate(['/login']);
  };
}
