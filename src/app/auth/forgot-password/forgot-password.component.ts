import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.css',
    // '../../../../public/admin/vendor/fontawesome-free/css/all.min.css',
    // '../../../../public/admin/css/sb-admin-2.min.css',
  ],
})
export class ForgotPasswordComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      // document.body.style.backgroundColor = '#5a5c69';
      document.body.classList.add('bg-dark', 'bg-gradient');
    }
  }
}
