import React from 'react';
import { useGetAuthorsQuery } from '../../auth/api/authApi';
import { Link } from 'react-router-dom';

const AuthorList = () => {
  const { data: authors } = useGetAuthorsQuery();
  return (
    <>
      {authors?.length && (
        <div className="cloud">
          {authors.map((author) => (
            <div key={author._id} className="list">
              <img src={author.avatar} alt={author.name} className="avatar" />
              <Link to={`/search/?author=${author._id}`}>{author.name}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AuthorList;
