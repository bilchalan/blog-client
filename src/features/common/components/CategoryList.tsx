import React from 'react';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      {categories?.length && (
        <div className="cloud">
          {categories.map((category) => (
            <div key={category._id} className="list">
              <Link to={`/search/?category=${category._id}`}>
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
