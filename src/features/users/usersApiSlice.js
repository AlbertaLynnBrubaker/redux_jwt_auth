import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                keepUnusedDataFor: 5,
                method: 'GET'
            })
        }),

    })
})

export const {
    useGetUsersQuery
} = usersApiSlice