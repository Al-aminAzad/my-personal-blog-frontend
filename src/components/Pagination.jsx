import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';
//files import
import useStyles from './styles.js'



const PaginationComponent = () => {
    const classes = useStyles();
  return (
    <Pagination
    classes = {{ul: classes.ul}}
    count={5}
    page={1}
    variant='outlined'
    color='primary'
    renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/posts/page=${1}`}/>
    )}
    />
  )
}

export default PaginationComponent