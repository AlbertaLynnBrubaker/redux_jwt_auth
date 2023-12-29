import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    // so it will send back our http only secure cookie to send with every query
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        // so we're setting our token to whatever token we have in state IF there is one and then checking against that. Basically, every time we call our baseQuery, we are checking for a token.
        if(token) {
            // our backend should recognize 'authorization'
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // the premade node backend we made will send a 403 forbidden status code if we had a token present but that token has expired but some backend APIs may only send a 401 unauthorized status code.
    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send a refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new toekn
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    // no need to put anything in the builder here because we are using extendedApiSlices for individual features
    endpoints: builder => ({})
})