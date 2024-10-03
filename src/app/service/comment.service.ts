import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../model/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  public findAllComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(this.baseUrl);
  }

  public findCommentById(commentId: string): Observable<CommentModel> {
    return this.http.get<CommentModel>(`${this.baseUrl}/${commentId}`);
  }

  public findCommentsByPostId(postId: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.baseUrl}/post/${postId}`);
  }

  public saveComment(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.baseUrl, comment);
  }

  public deleteComment(commentId: string): Observable<CommentModel> {
    return this.http.delete<CommentModel>(`${this.baseUrl}/${commentId}`);
  }

  public updateComment(comment: CommentModel): Observable<CommentModel> {
    return this.http.put<CommentModel>(
      `${this.baseUrl}/${comment.id}`,
      comment
    );
  }
}
