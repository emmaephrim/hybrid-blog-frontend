import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  usersCount: number = 0;
  postsCount: number = 0;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.usersCount = users.length;
    });

    this.postService.findAllPosts().subscribe((posts) => {
      this.postsCount = posts.length;
    });
  }
}
