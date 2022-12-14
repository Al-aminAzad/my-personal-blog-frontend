import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

//File import
import useStyles from './style.js';
import { createPost, updatePost } from '../../actions/Posts';
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clear();
  }
  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }
  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please sign in to create your blog and like other's blog.
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper} elevation={6} >
      <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit} >
        <Typography variant='h6' >{currentId ? 'Update' : 'Create'} a Memory</Typography>
        {/* <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator:e.target.value})} /> */}
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' variant='outlined' label='Message' multiline minRows={4} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput} >
          <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit' >Submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear} >Clear</Button>
      </form>
    </Paper>
  )
}
export default Form;