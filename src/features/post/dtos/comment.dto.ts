import { ReplyDto } from './reply.dto';

export type CommentDto = {
  postId: string;
  _id: string;
  commentBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  commentText: string;
  commentAt: Date | string;
  replies: ReplyDto[];
};
