import {fromJS} from 'immutable';
import {
    FETCH_NEWS,
    FETCH_ERROR,
    RECIEVE_POSTS,
    UPDATE_TEXT,
    SORT_POSTS
} from '../actions';

const sortPosts = (posts, action) => {
    switch (action.sortParameter) {
        case 'ascend_points':
            return posts.sortBy(post => post.get('num_points', 0));
        case 'descend_points':
            return posts.sortBy(post => post.get('num_points', 0)).reverse();
        case 'ascend_date':
            return posts.sortBy(post => new Date(post.get('created_at', '9/26/2016 3:26')));
        case 'descend_date':
            return posts.sortBy(post => new Date(post.get('created_at', '9/26/2016 3:26'))).reverse();
        default:
            return posts;
    }
}

const postReducer = (state = fromJS({posts: [], searchText: '', isFetching: false, error: ''}), action) => {
    switch (action.type) {
        case FETCH_ERROR:
            return state.set('error', action.error);
        case FETCH_NEWS:
            return state.set('isFetching', action.fetching);
        case RECIEVE_POSTS:
            return state.set('posts', fromJS(action.posts));
        case UPDATE_TEXT:
            return state.set('searchText', action.searchText);
        case SORT_POSTS:
            return state.update('posts', (posts) => sortPosts(posts, action));
        default:
            return state;
    }
}

export default postReducer;
