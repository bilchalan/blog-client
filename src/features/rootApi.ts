import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500/api/v1',
    credentials: 'include',
  }),
  tagTypes: [
    'Categories',
    'Tags',
    'Users',
    'Posts',
    'AllPost',
    'Post',
    'Comments',
  ],
  endpoints: (builder) => ({}),
});
