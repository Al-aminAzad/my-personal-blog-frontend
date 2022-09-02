import React, { useState } from 'react';
import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//File import
import useStyles from './styles.js';
import Input from './Input.js';
import Icon from './icon';
import { signin, signup } from '../../actions/Auth.js';

const initialState = {
    firstName : '',
    lastName : '',
    email: '',
    password:'',
    confirmPassword: ''
}
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleChange = (e) => { 
        setFormData({...formData, [e.target.name]:e.target.value })
    };
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };
    const switchMode = () => {
        setIsSignUp((prevMode) => !prevMode);
        setShowPassword(false)
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleError = (error) => {
        console.log(error)
        console.log('Google sign in failed. Try agin')
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth >
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </Button>
                    <GoogleLogin
                        clientId='874331961685-mb1gn9hfrkdbj3l74ro5neq5260k4ptb.apps.googleusercontent.com'
                        render={renderProps => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained' >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy={"single_host_origin"}
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;