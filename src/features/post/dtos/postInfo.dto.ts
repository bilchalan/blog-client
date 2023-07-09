import { PostDto } from './post.dto';

export type PostInfoDto = {
  posts: PostDto[];
  filteredPostCount: number;
  limit: number;
};
