import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Modal } from './Modal';
import { useGetAuthorsQuery } from '../../auth/api/authApi';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';
import { useGetTagsQuery } from '../../tag/api/tagApi';
import { useNavigate } from 'react-router-dom';

const SearchDialog = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const searchParams = new URLSearchParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(searchParams.get('title') || '');
  const [author, setAuthor] = useState<string>(
    searchParams.get('author') || '0'
  );
  const [category, setCategory] = useState<string>(
    searchParams.get('title') || '0'
  );
  const [tags, setTags] = useState<string[]>([]);
  const { data: authors } = useGetAuthorsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: tagList } = useGetTagsQuery();
  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...tags];
    if (e.target.checked) {
      updateList = [...tags, e.target.value];
    } else {
      updateList.splice(tags.indexOf(e.target.value), 1);
    }
    setTags(updateList);
  };
  const handleSearch = () => {
    if (title !== '') {
      searchParams.set('keyword', title);
    }
    if (author !== '0') {
      searchParams.set('author', author);
    }
    if (category !== '0') {
      searchParams.set('category', category);
    }
    tags?.forEach((tag) => {
      searchParams.append('tags', tag);
    });
    setOpenModal(false);
    navigate(`/search/?${serializeSearchParams(searchParams)}&page=1`);
  };

  const serializeSearchParams = (params: URLSearchParams) => {
    const entries = Array.from(params.entries());
    return entries
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  };
  return (
    <>
      <BsSearch className="search-button" onClick={() => setOpenModal(true)} />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="dialog">
          <div className="dialog-header">
            <span>Search options</span>
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>
          <div className="dialog-body">
            <div className="dialog-option">
              <span> Search in titles : </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <div className="dialog-option">
              <span> Search by author : </span>
              <div className="dialog-option-value">
                <select
                  id="authors"
                  onChange={(e) => setAuthor(e.target.value)}
                >
                  <option value="0">Select Author</option>
                  {authors &&
                    authors.map((author) => (
                      <option key={author._id} value={author._id}>
                        {author.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <div className="dialog-option">
              <span>Search by category</span>
              <div className="dialog-option-value">
                <span className="sp-bor">
                  <input
                    type="radio"
                    id="0"
                    name="0"
                    value="0"
                    checked={category === '0'}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="0">All category</label>
                </span>
                {categories &&
                  categories.map((cat) => (
                    <span key={cat._id} className="sp-bor">
                      <input
                        type="radio"
                        id={cat._id}
                        value={cat._id}
                        name={cat.title}
                        checked={category === cat._id}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <label htmlFor={cat._id}>{cat.title}</label>
                    </span>
                  ))}
              </div>
            </div>
            <hr style={{ width: '100%', margin: '20px 0' }} />
            <div className="dialog-option">
              <span>Search by tags : </span>
              <div className="dialog-option-value">
                {tagList &&
                  tagList.map((tag) => (
                    <span className="sp-bor" key={tag._id}>
                      <input
                        type="checkbox"
                        id={tag._id}
                        name={tag._id}
                        value={tag._id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTag(e)
                        }
                      />
                      <label htmlFor={tag._id}>{tag.title}</label>
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <div className="dialog-footer">
            <button onClick={() => setOpenModal(false)}>Cancel</button>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchDialog;
