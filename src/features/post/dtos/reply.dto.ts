export type ReplyDto = {
  _id: string;
  replyBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  replyText: string;
  replyAt: Date | string;
};
