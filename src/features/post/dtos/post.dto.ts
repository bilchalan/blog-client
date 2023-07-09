import { AuthorDto } from '../../auth/dtos/author.dto';
import { TagDto } from '../../tag/dtos/tag.dto';
export type Category = {
  _id: string;
  title: string;
};
export type PostDto = {
  _id: string;
  author: AuthorDto;
  title: string;
  content: string;
  excerpt: string;
  images: string[];
  category: Category;
  tags: TagDto[];
  likes: string[];
  totalComments: number;
  createdAt: Date;
  updatedAt: Date;
};
