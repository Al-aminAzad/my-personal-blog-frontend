import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

//File import
import useStyles from './style.js'
import { createPost, updatePost } from '../../actions/Posts'
const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, postData))
    }else{
      dispatch(createPost(postData))
    }
    clear();
  }
  const clear =()=>{
    setCurrentId(null);
    setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
  }
  useEffect(()=>{
    if(post) setPostData(post)
  },[post])
  return (
    <Paper className={classes.paper} >
      <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit} >
        <Typography variant='h6' >{currentId ? 'Update': 'Create'} a Memory</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator:e.target.value})} />
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value})} />
        <div className={classes.fileInput} >
          <FileBase type='file' multiple={false} onDone={({base64})=> setPostData({ ...postData, selectedFile:base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit' >Submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear} >Clear</Button>
      </form>
    </Paper>
  )
}
export default Form;