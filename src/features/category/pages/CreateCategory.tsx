import React, { useState, useEffect } from 'react';
import { useCreateCategoryMutation } from '../api/categoryApi';
import { enqueueSnackbar } from 'notistack';

const CreateCategory = () => {
  const [createCategory, { isSuccess }] = useCreateCategoryMutation();
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const handleSubmit = () => {
    const newCategory = { title, desc };
    createCategory(newCategory);
  };
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Category added', { variant: 'success' });
      setTitle('');
      setDesc('');
    }
  }, [isSuccess]);

  return (
    <>
      <h3>Create new category</h3>

      <label>Category Title : </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Category Description : </label>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit} style={{ padding: 10 }}>
        Submit
      </button>
    </>
  );
};

export default CreateCategory;
