import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
//File import
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/Posts';
import Pagination from '../Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >
                    <Grid item xs={12} sm={7}  >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}  >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} >
                            <Pagination/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;