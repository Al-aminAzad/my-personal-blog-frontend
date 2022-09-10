import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';

//File import
import Post from './Post/Post';
import useStyles from './style.js'

const Posts = ({setCurrentId}) => {
  const classes= useStyles();
  const {posts} = useSelector((state)=> state.posts);
  // console.log(posts)
  return (
    !posts?.length ? <CircularProgress/> :(
      <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3} >
        {posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} >
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
      </Grid>
    )
  )
}
export default Posts;