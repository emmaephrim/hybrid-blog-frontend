import { Routes } from '@angular/router';
import { IndexComponent } from './adminPages/index/index.component';
import { HomeComponent } from './homePages/home/home.component';
import { PostsComponent } from './homePages/posts/posts.component';
import { AdminComponent } from './adminPages/admin/admin.component';
import { PostFormComponent } from './adminPages/post-form/post-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { authGuard } from './guard/auth.guard';
import { PostDetailsComponent } from './homePages/post-details/post-details.component';
import { ManagePostsComponent } from './adminPages/manage-posts/manage-posts.component';
import { ManageCategoriesComponent } from './adminPages/manage-categories/manage-categories.component';
import { SideWidgetComponent } from './adminPages/side-widget/side-widget.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },

  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    children: [
      { path: '', component: PostsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'post/:id/comments', component: PostDetailsComponent },
      { path: 'posts/:id', component: PostDetailsComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: IndexComponent },
      {
        path: 'create-post',
        component: PostFormComponent,
      },
      { path: 'edit-post/:id', component: PostFormComponent },
      { path: 'manage-posts', component: ManagePostsComponent },
      { path: 'manage-categories', component: ManageCategoriesComponent },
      { path: 'side-widget', component: SideWidgetComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
];
