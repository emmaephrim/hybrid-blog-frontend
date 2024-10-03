export class CommentModel {
  id: string;
  content: string;
  createdAt: String;
  userId: string;
  postId: string;

  constructor() {
    this.id = '';
    this.content = '';
    this.createdAt = '';
    this.userId = '';
    this.postId = '';
  }
}
