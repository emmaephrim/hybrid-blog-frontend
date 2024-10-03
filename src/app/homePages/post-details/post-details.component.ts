import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentModel } from '../../model/comment.model';
import { CommentService } from '../../service/comment.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  private authService: AuthService = inject(AuthService);
  commentModel: CommentModel = new CommentModel();
  users: User[] = [];
  posts: Post[] = [];
  comments: CommentModel[] = [];
  post: Post = new Post();
  user: User = new User();

  // Initialize form with empty values
  commentForm: FormGroup = new FormGroup({
    userId: new FormControl(this.authService.getUserId()),
    postId: new FormControl(''),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    createdAt: new FormControl(),
  });

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];

    this.postService.findPostById(postId).subscribe((post) => {
      this.post = post;
      this.commentForm.patchValue({ postId: this.post.id });
    });

    this.commentService.findCommentsByPostId(postId).subscribe((data) => {
      this.comments = data;
    });

    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });

    this.postService.findAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  // Handle comment submission
  handleCommentSubmit() {
    if (!this.authService.isLoggedIn()) {
      alert('Please login to comment!');
      return;
    }
    this.commentForm.patchValue({
      createdAt: new Date().toISOString(),
    });

    this.commentModel = this.commentForm.value as CommentModel;
    this.commentService.saveComment(this.commentModel).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.toastr.success('Comment saved!');
        this.comments.push(result);
        this.commentForm.reset();
      } else {
        this.toastr.error('Error saving comment!');
      }
    });
  }

  findPostAuthor(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.fullName : 'Unknown';
  }

  findCommentAuthor(userId: string): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  formatDate(date: string | Date): string {
    const formattedDate = new Date(date).toUTCString().slice(0, 16);
    return formattedDate;
  }

  likePost(postId: string | null) {
    this.postService.likePost(postId as string).subscribe((updatedPost) => {
      const post = this.posts.find((p) => (p.id = updatedPost.id));
      if (post) {
        post.likes = updatedPost.likes;
        post.dislikes = updatedPost.dislikes;
        post.hasLiked = !post.hasLiked;
        this.post = post;
      } else {
        alert('Error liking post!');
      }
    });
  }

  dislikePost(postId: string | null) {
    this.postService.dislikePost(postId as string).subscribe((updatedPost) => {
      const post = this.posts.find((p) => p.id == updatedPost.id);
      if (post) {
        post.likes = updatedPost.likes;
        post.dislikes = updatedPost.dislikes;
        post.hasDisliked = !post.hasDisliked;
        this.post = post;
      } else {
        alert('Error disliking post!');
      }
    });
  }
}
