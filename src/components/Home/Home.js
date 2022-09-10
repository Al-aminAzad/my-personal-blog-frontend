import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
//File import
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/Posts';
import Pagination from '../Pagination';
import useStyles from './styles.js'
import { getPostBySearch } from '../../actions/Posts';
const useQuery = () => (
    new URLSearchParams(useLocation().search)
)

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([]);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')

    const handleKeyPress = (e)=>{
        if(e.keyCode === 13){
            //search post
            searchPost();
        }
    }
    const handleAdd = (tag)=>setTags([...tags,tag]);
    const handleDelete = (deleteTag)=> setTags(tags.filter(tag => tag !==deleteTag));
    const searchPost = () =>{
        if(search.trim() || tags){
            dispatch(getPostBySearch({search, tags:tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/');
        }
    }
    // useEffect(() => {
    //     dispatch(getPosts(page))
    // }, [currentId, dispatch])
    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer} >
                    <Grid item xs={12} sm={6} md={9}  >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}  >
                        <AppBar className={classes.appBarSearch} position='static' color='inherit' >
                            <TextField 
                            name='search' 
                            variant='outlined' 
                            fullWidth 
                            label='Search Blog' 
                            value={search} 
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setSearch(e.target.value)} 
                            />
                            <ChipInput
                            style={{margin:'10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label='Search Tags'
                            variant='outlined'
                            />
                            <Button 
                            onClick={searchPost}
                            variant='contained'
                            color='primary' >
                                Search
                            </Button>

                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} >
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
