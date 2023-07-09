import { rootApi } from '../../rootApi';
import { CommentDto } from '../dtos/comment.dto';
import { ReplyDto } from '../dtos/reply.dto';

interface IAddReplyParams extends ReplyDto {
  postId: string;
  commentId: string;
}

export const commentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentDto[], string>({
      query: (id: string) => `/comments/${id}`,
      providesTags: ['Comments'],
    }),
    addNewComment: builder.mutation<CommentDto, CommentDto>({
      query: ({ postId, commentText }: CommentDto) => ({
        url: `/comments`,
        method: 'POST',
        body: { postId, commentText },
      }),
      async onQueryStarted(
        { postId, ...rest }: CommentDto,
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          commentApi.util.updateQueryData('getComments', postId, (draft) => {
            draft.unshift({ postId, ...rest });
          })
        );
        try {
          const queryResult = await queryFulfilled;
          const { data: comment } = queryResult;
          dispatch(
            commentApi.util.updateQueryData('getComments', postId, (draft) => {
              draft[0]._id = comment._id;
            })
          );
        } catch (err) {
          result.undo();
          console.log(err);
        }
      },
    }),
    addNewReply: builder.mutation<CommentDto, IAddReplyParams>({
      query: ({ commentId, replyText }: IAddReplyParams) => ({
        url: `/comments/replies`,
        method: 'POST',
        body: { commentId, replyText },
      }),
      async onQueryStarted(
        { postId, ...rest }: IAddReplyParams,
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          commentApi.util.updateQueryData('getComments', postId, (draft) => {
            for (let i = 0; i < draft.length; i++) {
              if (draft[i]._id === rest.commentId) {
                const { commentId, ...replywithpoutCommentId } = rest;
                draft[i].replies.unshift(replywithpoutCommentId);
              }
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
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useAddNewReplyMutation,
} = commentApi;
