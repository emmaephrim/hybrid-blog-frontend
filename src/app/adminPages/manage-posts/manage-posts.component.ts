import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { CategoryService } from '../../service/category.service';
import { CategoryModel } from '../../model/category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import 'datatables.net-responsive';

@Component({
  selector: 'app-manage-posts',
  standalone: true,
  imports: [DataTablesModule, CommonModule],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.css',
})
export class ManagePostsComponent implements OnInit {
  posts: Post[] = [];
  categories: CategoryModel[] = [];
  deletePostId!: string;

  dtOptions: Config = {};

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    import('datatables.net-responsive');
    this.dtOptions = {
      responsive: true,
      processing: true,
    };

    this.postService.findAllPosts().subscribe((result) => {
      this.posts = result;
    });

    this.categoryService
      .getAllCategories()
      .subscribe((res) => (this.categories = res));
  }

  getPostCategory(categoryId: string) {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  editPost(postId: string) {
    this.router.navigate(['admin/edit-post', postId]);
    console.log('Edit post', postId);
  }

  setDeletePostId(postId: string) {
    this.deletePostId = postId;
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe((res) => {
      this.toastr.success('Post deleted successfully');
      this.posts = this.posts.filter((post) => post.id !== postId);
    });
  }

  viewPost(postId: string) {
    this.router.navigate(['/posts', postId]);
  }
}
