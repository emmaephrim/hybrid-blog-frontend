import { CommentModel } from './comment.model';

describe('Comment', () => {
  it('should create an instance', () => {
    expect(new CommentModel()).toBeTruthy();
  });
});
