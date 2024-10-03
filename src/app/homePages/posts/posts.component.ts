import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentService } from '../../service/comment.service';
import { CommentModel } from '../../model/comment.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  comments: CommentModel[] = [];
  posts: Post[] = [];
  postService: PostService = inject(PostService);

  isLoading: boolean = true;

  page: number = 0;
  size: number = 3;
  totalPages: number = 0;
  searchQuery: string = '';

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {
    // this.postService.findAllPosts().subscribe((data) => {
    //   this.posts = data;
    // });
    // this.commentService.findAllComments().subscribe((data) => {
    //   this.comments = data;
    // });
  }

  formatDate(date: string | Date): string {
    const formattedDate = new Date(date).toUTCString().slice(0, 16);
    return formattedDate;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.loadPosts();
    });

    this.commentService.findAllComments().subscribe((data) => {
      this.comments = data;
    });
  }

  loadPosts() {
    this.postService
      .findPostsPageable(this.page, this.size, this.searchQuery)
      .subscribe((data: any) => {
        this.posts = data.content;
        this.isLoading = false;
        this.totalPages = data.totalPages;
      });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPosts();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadPosts();
    }
  }

  sharePost(postId: string | null) {
    const currentUrl = window.location.origin;
    const postUrl = `${currentUrl}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl);
    alert('Post URL copied to clipboard!');
  }

  shareCount = 5;

  getPostCommentsCount(postId: string) {
    return this.comments.filter((comment) => comment.postId === postId).length;
  }

  likePost(postId: string | null) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.hasLiked = !post.hasLiked;
      if (post.hasLiked) {
        post.likes += 1;
      } else {
        post.likes -= 1;
      }

      this.postService.likePost(postId as string).subscribe(
        (updatedPost) => {
          const index = this.posts.findIndex((p) => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
        },
        (error) => {
          alert('Error liking post!');
          post.hasLiked = !post.hasLiked;
          if (post.hasLiked) {
            post.likes += 1;
          } else {
            post.likes -= 1;
          }
        }
      );
    }
  }

  dislikePost(postId: string | null) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.hasDisliked = !post.hasDisliked;
      if (post.hasDisliked) {
        post.dislikes += 1;
      } else {
        post.dislikes -= 1;
      }

      this.postService.dislikePost(postId as string).subscribe(
        (updatedPost) => {
          const index = this.posts.findIndex((p) => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
        },
        (error) => {
          alert('Error disliking post!');
          post.hasDisliked = !post.hasDisliked;
          if (post.hasDisliked) {
            post.dislikes += 1;
          } else {
            post.dislikes -= 1;
          }
        }
      );
    }
  }

  getPostAuthor(postId: string) {
    const post = this.posts.find((p) => p.id == postId);
    return post?.userId;
  }
}
