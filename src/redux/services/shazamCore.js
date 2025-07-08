import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
// method: 'GET',
// headers: {
//     'x-rapidapi-key': 'd5e7116b42msh161bd4354b01378p1a487ajsn3eb7701e376c',
//     'x-rapidapi-host': 'shazam-core.p.rapidapi.com'
// },
// parameters: {
//     country_code: 'IN'
// }
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=IN', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders:(headers) =>{
            headers.set('x-rapidapi-key','d5e7116b42msh161bd4354b01378p1a487ajsn3eb7701e376c');
            headers.set('x-rapidapi-host','shazam-core.p.rapidapi.com');
            return headers;
        },
    }),
    keepUnusedDataFor: 30,
    endpoints:(builder) =>({
        getTopCharts: builder.query({
            query: ()=> '/charts/world?country_code=IN',
            transformErrorResponse: (response, meta, arg) => {
                console.error('Top Charts API Error:', response);
                return response;
            }
        }),
        getArtistDetails: builder.query({
            query: (artistId) => `/artists/details?artist_id=${artistId}`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Artist Details API Error:', response);
                return response;
            }
        }),
        getSongDetails: builder.query({
            query: (songId) => `/tracks/details?track_id=${songId}`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Song Details API Error:', response);
                return response;
            }
        }),
        getSongsByCountry: builder.query({
            query: (countryCode) => `/charts/country?country_code=${countryCode}`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Songs by Country API Error:', response);
                return response;
            }
        }),
        getSongsByGenre: builder.query({
            query: (genre) => `/charts/genre?genre=${genre}`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Songs by Genre API Error:', response);
                return response;
            }
        }),
        getSongRelated: builder.query({
            query: (songId) => `/tracks/related?track_id=${songId}`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Related Songs API Error:', response);
                return response;
            }
        }),
        getTopArtists: builder.query({
            query: ()=> '/charts/artists?country_code=IN',
            transformErrorResponse: (response, meta, arg) => {
                console.error('Top Artists API Error:', response);
                return response;
            }
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `/search?query=${searchTerm}&limit=20`,
            transformErrorResponse: (response, meta, arg) => {
                console.error('Search API Error:', response);
                return response;
            }
        }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongRelatedQuery,
    useGetTopArtistsQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;