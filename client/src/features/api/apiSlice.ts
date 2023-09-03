import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUsersParams, PositionsResponse, UserResponse, UsersResponse } from '@/types';
import { RootState } from '@/store';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getPositions: builder.query<PositionsResponse, undefined>({
            query: () => ({
                url: '/positions',
                method: 'GET',
            }),
        }),
        createUser: builder.mutation<UserResponse, FormData>({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body: body,
                formData: true,
            }),
            invalidatesTags: ['Users'],
        }),
        getUsers: builder.query<UsersResponse, GetUsersParams>({
            query: (queryArgs) => ({
                url: '/users',
                method: 'GET',
                params: {
                    ...queryArgs,
                },
            }),
            providesTags: ['Users'],
        }),
    }),
});

export const { useGetPositionsQuery, useCreateUserMutation, useGetUsersQuery } = apiSlice;
