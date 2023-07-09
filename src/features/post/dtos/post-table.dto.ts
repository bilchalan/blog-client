import { AuthorDto } from '../../auth/dtos/author.dto';

export type PostTableDto = {
  _id: string;
  author: AuthorDto;
  title: string;
  images: string;
  approved: boolean;
  createdAt: Date;
};
