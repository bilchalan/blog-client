import React from 'react';
import { BsPencil, BsTags } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import AuthorList from './AuthorList';
import CategoryList from './CategoryList';
import TagList from './TagList';

const Sidebar = () => {
  return (
    <>
      <div className="aside-content">
        <h5 className="aside-header">
          <BsPencil className="icons" />
          Author List
        </h5>
        <div className="aside-body">
          <AuthorList />
        </div>
      </div>

      <div className="aside-content">
        <h5 className="aside-header">
          <BsTags className="icons" />
          Tags List
        </h5>
        <div className="aside-body">
          <TagList />
        </div>
      </div>

      <div className="aside-content">
        <h5 className="aside-header">
          <BiCategory className="icons" />
          Category List
        </h5>
        <div className="aside-body">
          <CategoryList />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
