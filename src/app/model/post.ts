import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export class Post {
  authService: AuthService = inject(AuthService);
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  categoryId: string;
  userId: string;
  imageUrl: string;
  commentsIdList: string[];
  likes: number;
  dislikes: number;
  shares: number;
  hasLiked: boolean;
  hasDisliked: boolean;

  constructor() {
    this.id = '';
    this.title = '';
    this.content = '';
    this.createdAt = new Date();
    this.categoryId = '';
    this.userId = this.authService.getUserId();
    this.imageUrl = '';
    this.commentsIdList = [];
    this.likes = 0;
    this.dislikes = 0;
    this.shares = 0;
    this.hasLiked = false;
    this.hasDisliked = false;
  }
}
