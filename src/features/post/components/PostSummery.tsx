import React from 'react';
import { PostInfoDto } from '../dtos/postInfo.dto';
import { PostDto } from '../dtos/post.dto';
import { Link } from 'react-router-dom';
import { BiCategory, BiComment, BiLike } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';

const PostSummery = ({
  postInfo,
  post,
  index,
}: {
  postInfo: PostInfoDto;
  post: PostDto;
  index: number;
}) => {
  return (
    <article
      className={
        postInfo.posts.length - 1 === index ? 'article article-last' : 'article'
      }
    >
      <div className="article-banner">
        <img src={post.images[0]} width="100%" alt={post.title} />
      </div>
      <div className="article-content">
        <Link to={`/posts/${post._id}`}>
          <h1 className="article-title">{post.title}</h1>
        </Link>
        <div className="article-author">
          <h4 className="article-author-name">
            Author :
            <Link to={`/search/?author=${post.author._id}&page=1`}>
              {post.author.name}
            </Link>
          </h4>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="avatar"
          />
        </div>
        <p className="article-body">{post.excerpt}</p>
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
        <div className="article-meta">
          <span>
            <BiLike className="icons" />
            &nbsp;
            {post.likes.length} &nbsp; likes
          </span>
          <span>
            <BiComment className="icons" />
            &nbsp;
            {post.totalComments}&nbsp; comments & replies
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostSummery;
