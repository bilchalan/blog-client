import React, { useState, useEffect } from 'react';
import { useCreateTagMutation } from '../api/tagApi';
import { enqueueSnackbar } from 'notistack';

const CreateTag = () => {
  const [createTag, { isSuccess }] = useCreateTagMutation();
  const [title, setTitle] = useState<string>('');
  const handleSubmit = () => {
    const newTag = { title };
    createTag(newTag);
  };
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Tag added', { variant: 'success' });
      setTitle('');
    }
  }, [isSuccess]);

  return (
    <>
      <h3>Create new tag</h3>
      <label>Tag title : </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit} style={{ padding: 10 }}>
        Submit
      </button>
    </>
  );
};

export default CreateTag;
