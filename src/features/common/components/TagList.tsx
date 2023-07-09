import React from 'react';
import { useGetTagsQuery } from '../../tag/api/tagApi';
import { Link } from 'react-router-dom';

const TagList = () => {
  const { data: tags } = useGetTagsQuery();
  return (
    <>
      {tags?.length && (
        <div className="cloud tag-cloud">
          {tags.map((tag) => (
            <div key={tag._id} className="list">
              <Link to={`/search/?tags=${tag._id}`}>{tag.title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagList;
