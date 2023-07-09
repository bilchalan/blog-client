import { rootApi } from '../../rootApi';
import { CategoryDto } from '../dtos/Category.dto';

interface ICreateCategoryDto {
  title: string;
  desc: string;
}

export const categoryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<void, ICreateCategoryDto>({
      query: (newCategory) => ({
        url: `/categories`,
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Categories'],
    }),
    getCategories: builder.query<CategoryDto[], void>({
      query: () => `/categories`,
      providesTags: ['Categories'],
    }),
  }),
});
export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
