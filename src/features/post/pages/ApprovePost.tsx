import React, { useState, useEffect } from 'react';
import { useGetPostsByAdminQuery } from '../api/postApi';
import { Link } from 'react-router-dom';
import { usePostApprovalMutation } from '../api/postApi';
import { enqueueSnackbar } from 'notistack';

const ApprovePost = () => {
  const { data: posts } = useGetPostsByAdminQuery();
  const [ids, setIds] = useState<string[]>([]);
  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...ids];
    if (e.target.checked) {
      updateList = [...ids, e.target.value];
    } else {
      updateList.splice(ids.indexOf(e.target.value), 1);
    }
    setIds(updateList);
  };
  const [postApproval, { isSuccess }] = usePostApprovalMutation();
  const handleApprove = (approve: boolean) => {
    const approval = { approve: approve, ids };
    if (ids.length) {
      postApproval(approval);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Post approval updated.', { variant: 'success' });
    }
  }, [isSuccess]);

  return (
    <>
      <h3>List of all posts:</h3>
      <div className="data-table">
        {posts &&
          posts.map((post) => (
            <div className="table" key={post._id}>
              <input
                type="checkbox"
                value={post._id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleId(e)
                }
              />
              <img src={post.images[0]} alt={post.title} width={100} />
              <div className="table-info">
                <div className="table-info-title">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </div>
                <div className="table-info-author">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                  />
                  <div className="table-info-author-info">
                    <span>Written by </span>
                    <Link to={`/search/?author=${post.author._id}&page=1`}>
                      {post.author.name}
                    </Link>
                    <span>at </span>
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                {post.approved ? (
                  <span style={{ color: 'green' }}>Approved</span>
                ) : (
                  <span style={{ color: 'red' }}>Not Approved</span>
                )}
              </div>
            </div>
          ))}
      </div>
      <div style={{ margin: '10px auto' }}>
        <button style={{ marginRight: 10 }} onClick={() => handleApprove(true)}>
          Approve
        </button>
        <button onClick={() => handleApprove(false)}>Disapprove</button>
      </div>
    </>
  );
};

export default ApprovePost;
