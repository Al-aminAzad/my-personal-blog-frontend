import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

//File import
import memories from '../../images/memories.png';
import useStyles from './styles.js';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location =  useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logOut = () => {
        dispatch({type:'LOGOUT'})
        setUser(null)
        history.push('/')
    }

    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodeToken = decode(token);
            if (decodeToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    return (
        <AppBar className={classes.appBar} position='static' color='inherit' >
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to='/' variant='h2' align='center' >Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height='60' />
            </div>
            <Toolbar>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button className={classes.logout} variant='contained' color='secondary' onClick={logOut} >Logout</Button>
                    </div>
                ) : (
                    <Button variant='contained' component={Link} to='/auth' color='primary' >Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
