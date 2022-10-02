import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography, TextField } from "@material-ui/core";

//File import
import useStyles from "./style.js";
import {commentPost} from '../../actions/Posts'

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleComment = async () => {
    const finalComment = `${user.result.name}:${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment('')
    commentsRef.current.scrollIntoView({behavior:'smooth'})
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((item, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              {item}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
                <div style={{ width: "70%" }}>
                <Typography gutterBottom variant="h6">
                  Write a Comment
                </Typography>
                <TextField
                  fullWidth
                  minRows={4}
                  multiline
                  label="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant='outlined'
                />
                <Button style={{marginTop:'10px'}} color='primary' disabled={!comment} variant='contained' fullWidth onClick={handleComment} >Comment</Button>
              </div>
        )}
      </div>
    </div>
  )
};

export default CommentSection;
