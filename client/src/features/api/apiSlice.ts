import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PositionsResponse, UserResponse, UsersResponse } from '@/types';
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
        }),
        getUsers: builder.query<UsersResponse, undefined>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetPositionsQuery, useCreateUserMutation, useGetUsersQuery } = apiSlice;
