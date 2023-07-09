import React, { useState } from 'react';
import { useGetPostsQuery } from '../api/postApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import PostSummery from '../components/PostSummery';
import Pagination from 'react-js-pagination';
const Posts = () => {
  const location = useLocation();
  const getUrlSearchParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: postInfo,
    isError,
    isSuccess,
    isLoading,
  } = useGetPostsQuery(
    {
      searchParams: getUrlSearchParams.toString(),
    },
    { refetchOnMountOrArgChange: true }
  );
  const handlePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <div>Error occured.</div>;
  }
  if (isSuccess) {
    content = (
      <>
        {postInfo &&
          postInfo?.posts?.map((post, index) => (
            <PostSummery
              postInfo={postInfo}
              post={post}
              index={index}
              key={post._id}
            />
          ))}
        <div className="paginate">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postInfo.limit}
            totalItemsCount={postInfo.filteredPostCount}
            onChange={(page: number) => handlePage(page)}
            nextPageText=">"
            prevPageText="<"
            firstPageText="<<"
            lastPageText=">>"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive active"
            activeLinkClass="pageLInkActive disabled"
            itemClassNext="symbol"
            itemClassLast="symbol"
            itemClassFirst="symbol"
            itemClassPrev="symbol"
          />
        </div>
      </>
    );
  }

  return content || <></>;
};

export default Posts;
