import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_POST:
    // Take the existing posts we have, take them all out of the state object
    // and put them in the new object that will be returned. Also add a new
    // key/value pair where the key is the id of the fetched post and the
    // value is the post itself.

    // This is the ES5 way of doing it.
    // const post = action.payload.data;
    // const newState = { ...state };
    // newState[post.id] = post;
    // return newState;

    // The square braces are for key interpolation!
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
