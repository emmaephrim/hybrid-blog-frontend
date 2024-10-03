import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { CategoryModel } from '../../model/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostsComponent,
    RouterOutlet,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  // styleUrls: ['./blog-home.css'],
  styleUrls: ['./home.component.css', './blog-home.css'],
})
export class HomeComponent {
  searchQuery: string = '';
  categories: CategoryModel[] = [];

  authService: AuthService = inject(AuthService);
  isBrowser = () => this.authService.isBrowser();
  isNormalUser = () => this.authService.isNormalUser();
  isAdmin: () => boolean;
  logout = () => this.authService.logout();
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = () => this.authService.isAdmin();
  }
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSearch() {
    if (
      this.searchQuery === '' &&
      this.searchQuery.trim() === '' &&
      !this.searchQuery
    ) {
      return;
    }
    this.router.navigate(['/posts'], {
      queryParams: { search: this.searchQuery },
    });
    this.searchQuery = '';
  }
}
