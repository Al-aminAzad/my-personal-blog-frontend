import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";

// file import
import useStyles from "./style.js";
import { getPost, getPostBySearch } from "../../actions/Posts";
import CommentSection from "./CommentSection.jsx";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { post, posts, isLoading } = useSelector((state) => state.posts);



  useEffect(()=>{
    dispatch(getPost(id))
  },[id])
  useEffect(()=>{
    if(post){
      dispatch(getPostBySearch({search:'none',tags:post?.tags.join(',')}));
    }
  },[post])
  const openPost= (id)=>{
    history.push(`/posts/${id}`);
  }
  if (!post) return null;
  if (isLoading){
    return(
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size='7em'/>
      </Paper>
    )
  }

  const recommendedPosts =posts?.filter(item => item._id !== post._id) 
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <CommentSection post={post}/>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h6">
            You might also like:
          </Typography>
          <Divider/>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({title,message,likes,selectedFile,name,_id})=>(
              <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width='200px'/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
