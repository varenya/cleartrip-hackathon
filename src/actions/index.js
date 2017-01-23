export const FETCH_NEWS = 'FETCH_NEWS';
export const RECIEVE_POSTS = 'RECIEVE_POSTS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const SEARCH_TITLE = 'SEARCH_TITLE';
export const SORT_POSTS = 'SORT_POSTS';

import axios from 'axios';

const ROOT_URL = 'http://starlord.hackerearth.com/cleartrip/hackernews';

export const fetchStatus = (fetching) => ({type: FETCH_NEWS, fetching});

export const recievePosts = (posts) => ({type: RECIEVE_POSTS, posts});

export const sortPosts = (sortParameter) => ({type: SORT_POSTS, sortParameter})

export const fetchError = (error) => ({type: FETCH_ERROR, error});

export const updateText = (searchText) => ({type: UPDATE_TEXT, searchText});

export const searchTitle = (searchTitle) => ({type: SEARCH_TITLE, searchTitle});

export const fetchNews = () => dispatch => {
  
    // Only minor caching logic is implemented here since redux store is basically acting here as a local cache in itself
    // We don't really need the below logic as well since only during refresh will this logic come in handy.

    const hackernews = localStorage.getItem('hackernews');
    if (hackernews) {
        dispatch(recievePosts(JSON.parse(hackernews)));
    } else {
        dispatch(fetchStatus(true));
        axios.get(ROOT_URL).then(response => {
            localStorage.setItem('hackernews', JSON.stringify(response.data));
            dispatch(recievePosts(response.data));
            dispatch(fetchStatus(false));

        }).catch(({error}) => {
            dispatch(fetchError('Error while fetching..'));
        });
    }
}
