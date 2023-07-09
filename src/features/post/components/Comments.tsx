import React from 'react';
import { CommentDto } from '../dtos/comment.dto';
import { UserDto } from '../../auth/dtos/user.dto';
import Replies from './Replies';

const Comments = ({
  comments,
  user,
}: {
  comments: CommentDto[];
  user: UserDto | null;
}) => {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <div className="comment-avtr">
            <img
              src={comment.commentBy.avatar}
              alt={user?.name}
              className="avatar"
            />
          </div>
          <div className="comment-body">
            <div className="comment-head">
              <span className="commentby">{comment.commentBy.name}</span>
              <span className="commentat">
                {new Date(comment.commentAt).toLocaleString()}
              </span>
            </div>
            <div className="comment-text">
              {comment.commentText}
              <Replies
                replies={comment.replies}
                user={user}
                commentId={comment._id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
