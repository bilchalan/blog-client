import React, { useState } from 'react';
import { ReplyDto } from '../dtos/reply.dto';
import { UserDto } from '../../auth/dtos/user.dto';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAddNewReplyMutation } from '../api/commentApi';
interface RepliesProps {
  replies: ReplyDto[];
  user: UserDto | null;
  commentId: string;
}
const Replies = ({ replies, user, commentId }: RepliesProps) => {
  const [addNewReply] = useAddNewReplyMutation();
  const [replyText, setReplyText] = useState<string>('');
  const location = useLocation();
  const { id = '' } = useParams();
  const handleReply = () => {
    if (user && replyText !== '') {
      const newReply = {
        postId: id,
        commentId: commentId,
        _id: Math.floor(Math.random() * 9999).toString(),
        replyBy: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        replyText: replyText,
        replyAt: new Date().toISOString(),
      };
      addNewReply(newReply);
      setReplyText('');
    }
  };
  return (
    <>
      <details>
        <summary>
          reply
          {!replies.length
            ? ''
            : replies.length === 1
            ? ' - ' + replies.length + ' reply'
            : ' - ' + replies.length + ' replies'}
        </summary>
        {user ? (
          <div className="comment newcomment">
            <div className="comment-avtr">
              <img src={user.avatar} alt={user.name} className="avatar" />
            </div>
            <div className="comment-new">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReply}>Reply</button>
            </div>
          </div>
        ) : (
          <Link to="/auth" state={{ from: location }}>
            To Reply sign in first.
          </Link>
        )}
        <div className="replies">
          {replies.map((reply) => (
            <div className="comment" key={reply._id}>
              <div className="comment-avtr">
                <img
                  src={reply.replyBy.avatar}
                  alt={reply.replyBy.name}
                  className="avatar"
                />
              </div>
              <div className="comment-body">
                <div className="comment-head">
                  <span className="commentby">{reply.replyBy.name}</span>
                  <span className="commentat">
                    {new Date(reply.replyAt).toLocaleString()}
                  </span>
                </div>
                <div className="commentText">{reply.replyText}</div>
              </div>
            </div>
          ))}
        </div>
      </details>
    </>
  );
};

export default Replies;
