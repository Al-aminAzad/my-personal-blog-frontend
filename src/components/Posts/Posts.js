import React from 'react'
import { useSelector } from 'react-redux';

//File import
import Post from './Post/Post';
import useStyles from './style.js'

const Posts = () => {
  const classes= useStyles();
  const posts = useSelector((state)=> state.posts);
  console.log(posts)
  return (
      <>
      <div>Posts</div>
      <Post/>
      <Post/>
      </> 
  )
}
export default Posts;