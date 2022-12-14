import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';

//File import
import Post from './Post/Post';
import useStyles from './style.js'

const Posts = ({setCurrentId}) => {
  const classes= useStyles();
  const {posts, isLoading} = useSelector((state)=> state.posts);
  // console.log(posts)
  if(!posts.length && !isLoading) return <Typography variant='h3' align='center' color='secondary'>No Post found</Typography>
  return (
    isLoading ? <CircularProgress/> :(
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