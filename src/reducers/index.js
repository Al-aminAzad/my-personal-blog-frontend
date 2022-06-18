import { combineReducers } from "redux";

//File import
import posts from './posts';
import auth from './auth'

export default combineReducers({
    posts,auth
})