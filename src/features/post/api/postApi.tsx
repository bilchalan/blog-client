import { rootApi } from '../../rootApi';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostTableDto } from '../dtos/post-table.dto';
import { PostDto } from '../dtos/post.dto';
import { PostInfoDto } from '../dtos/postInfo.dto';

interface IApprove {
  approve: boolean;
  ids: string[];
}
interface ISearchParams {
  searchParams: string;
}
interface ILikeRequestParams {
  postId: string;
  userId: string;
}
export const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, CreatePostDto>({
      query: (newPost: CreatePostDto) => ({
        url: `/posts`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    getPostsByAdmin: builder.query<PostTableDto[], void>({
      query: () => `/posts/get/all`,
      providesTags: ['AllPost'],
    }),
    postApproval: builder.mutation<void, IApprove>({
      query: (approve: IApprove) => ({
        url: `/posts/approve`,
        method: 'PUT',
        body: approve,
      }),
      invalidatesTags: ['AllPost'],
    }),
    getPosts: builder.query<PostInfoDto, ISearchParams>({
      query: ({ searchParams }) => `/posts/?${searchParams}`,
      providesTags: ['Posts'],
    }),
    getPostDetails: builder.query<PostDto, string>({
      query: (id: string) => `/posts/${id}`,
      providesTags: ['Post'],
    }),
    changeLike: builder.mutation<string[], ILikeRequestParams>({
      query: ({ postId }: ILikeRequestParams) => ({
        url: `/posts/${postId}/likes`,
        method: 'PUT',
        body: {},
      }),
      async onQueryStarted(
        { postId, userId }: ILikeRequestParams,
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          postApi.util.updateQueryData('getPostDetails', postId, (draft) => {
            draft.likes = draft.likes || [];
            const index = draft.likes.indexOf(userId);
            if (index > -1) {
              draft.likes.splice(index, 1);
            } else {
              draft.likes.push(userId);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsByAdminQuery,
  usePostApprovalMutation,
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useChangeLikeMutation,
} = postApi;
