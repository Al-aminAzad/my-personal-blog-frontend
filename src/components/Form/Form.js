import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64'

//File import
import useStyles from './style.js'

const Form = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''})
  const handleSubmit = ()=>{

  }
  const clear =()=>{

  }
  return (
    <Paper className={classes.paper} >
      <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit} >
        <Typography variant='h6' >Create a Memory</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator:e.target.value})} />
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value})} />
        <div className={classes.fileInput} >
          <FileBase type='file' multiple={false} onDone={(base64)=> setPostData({ ...postData, selectedFile:base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit' >Submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear} >Clear</Button>
      </form>
    </Paper>
  )
}
export default Form;