import React, { useState } from 'react';
import { useGetPostDetailsQuery } from '../api/postApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { BiCategory } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';
import { useGetCommentsQuery } from '../api/commentApi';
import Comments from '../components/Comments';
import { useChangeLikeMutation } from '../api/postApi';
import { useAddNewCommentMutation } from '../api/commentApi';

const PostDetails = () => {
  const [changeLike] = useChangeLikeMutation();
  const [addNewComment] = useAddNewCommentMutation();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>('');
  const { user } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const { id = '' } = useParams();
  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
  } = useGetPostDetailsQuery(id);
  const { data: comments } = useGetCommentsQuery(id);
  const handleLike = () => {
    if (user) {
      changeLike({ postId: id, userId: user._id });
    } else {
      navigate('/auth', { state: { from: location }, replace: true });
    }
  };
  const addComment = () => {
    if (user) {
      const newComment = {
        postId: id,
        _id: Math.floor(Math.random() * 9999).toString(),
        commentBy: {
          _id: user._id.toString(),
          name: user.name,
          avatar: user.avatar,
        },
        commentText: comment,
        commentAt: new Date().toISOString(),
        replies: [],
      };
      addNewComment(newComment);
      setComment('');
    }
  };
  let content;
  if (isLoading) content = <>Loading</>;
  if (isError) content = <>Error occured.</>;
  if (isSuccess) {
    content = (
      <article className="article-details">
        <div className="article-banner">
          <img src={post.images[0]} width="100%" alt={post.title} />
        </div>
        <div className="article-content">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-author">
            <div className="article-author-avtr">
              <img
                src={post.author.avatar}
                className="avatar-big"
                alt={post.author.name}
              />
              <h4 className="article-author-name">
                <Link to={`/search/?author=${post.author._id}`}>
                  {post.author.name}
                </Link>
              </h4>
            </div>
            <div className="article-like" onClick={handleLike}>
              {user && post.likes.includes(user._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {post.likes.length}
            </div>
          </div>
          <div className="article-body">
            <div
              className="rendered-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <div className="article-meta">
            <span>
              <BiCategory className="icons" /> &nbsp;
              <Link to={`/search/?category=${post.category._id}&page=1`}>
                {post.category.title}
              </Link>
            </span>
            {post.tags.length > 0 && (
              <span>
                <BsTags className="icons" /> &nbsp;
                {post.tags.map((tag, index) => (
                  <Link
                    to={`/search/?tags=${tag._id}}&page=1`}
                    key={tag._id}
                    className={
                      post.tags.length - 1 === index ? 'bord bordlast' : 'bord'
                    }
                  >
                    {tag.title}
                  </Link>
                ))}
              </span>
            )}
          </div>
        </div>
        <div className="article-comment">
          <div className="comment-count">
            {!comments?.length ? 'No comment' : comments.length + 'comments'}
          </div>
          <div className="comment">
            {!user ? (
              <Link to="/auth" state={{ from: location }} replace>
                To comment or reply sign in first.
              </Link>
            ) : (
              <>
                <div className="comment-avtr">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                </div>
                <div className="comment-new">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={addComment}>Add new comment</button>
                </div>
              </>
            )}
          </div>
          {comments && (
            <Comments comments={comments} user={user ? user : null} />
          )}
        </div>
      </article>
    );
  }
  return content || <></>;
};

export default PostDetails;
