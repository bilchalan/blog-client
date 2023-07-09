import { rootApi } from '../../rootApi';
import { ISignInDto } from '../dtos/signIn.dto';
import { ISignUpDto } from '../dtos/signUp.dto';
import { UserDto } from '../dtos/user.dto';

interface IChangeRolesDto {
  id: string;
  roles: string[];
}

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserDto, ISignUpDto>({
      query: (iSignUpDto: ISignUpDto) => ({
        url: '/users/signup',
        method: 'POST',
        body: iSignUpDto,
      }),
    }),
    signIn: builder.mutation<UserDto, ISignInDto>({
      query: (iSignInDto: ISignInDto) => ({
        url: '/users/signin',
        method: 'POST',
        body: iSignInDto,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        body: {},
      }),
    }),
    me: builder.query<UserDto, void>({
      query: () => `/users/me/profile`,
    }),
    getUsers: builder.query<UserDto[], void>({
      query: () => `/users`,
      providesTags: ['Users'],
    }),
    changeRoles: builder.mutation<void, IChangeRolesDto>({
      query: (iChangeRolesDto: IChangeRolesDto) => ({
        url: '/users/roles/update',
        method: 'PUT',
        body: iChangeRolesDto,
      }),
      invalidatesTags: ['Users'],
    }),
    getAuthors: builder.query<UserDto[], void>({
      query: () => `users/roles/authors`,
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetUsersQuery,
  useChangeRolesMutation,
  useGetAuthorsQuery,
} = authApi;
