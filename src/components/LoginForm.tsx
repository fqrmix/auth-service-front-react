import 'react-toastify/dist/ReactToastify.css';
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "..";
import { Bounce, toast, ToastContainer } from "react-toastify";
import queryString from 'query-string';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

import { 
    Avatar, Box, 
    Container, createTheme, CssBaseline, 
    TextField, ThemeProvider, Typography 
} from "@mui/material";
import { IErrorResponse } from '../models/IAuthResponse';


export const LoginForm: FC = () => {
    const { contextStore } = useContext(Context)
    const defaultTheme = createTheme();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        let errorMessage = queryString.parse(window.location.search).errorMessage
        if(errorMessage) {
            toast.warn(errorMessage, {containerId: 'bottomCenter'});
        }
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsButtonDisabled(true)
        const data = new FormData(event.currentTarget);
        const username = (data.get('username') || '').toString();
        const password = (data.get('password') || '' ).toString();
        contextStore.login(username, password)
            .then(() => {
                toast.success('Auth was successfull. Redirecting...', {containerId: 'topRight'})
                let redirectUrl = queryString.parse(window.location.search).redirectUrl
                if(!redirectUrl) {
                    redirectUrl = 'fqrmix.ru'
                }
                setTimeout(() => {
                    window.location.replace("https://" + redirectUrl)
                }, 3000);
                
            })
            .catch((apiError: IErrorResponse) => {
                console.log(apiError)
                const errorMSG = ( apiError: IErrorResponse ) => (
                    <div>
                        { apiError.message }
                        { apiError.errors.length > 0 &&
                            <ul>
                                {
                                    apiError.errors.map(error => {
                                        return <li key={error.error}>{error.description}</li>
                                    })
                                }
                            </ul>
                        }
                    </div>
                );
                toast.error(errorMSG(apiError), {containerId: 'topRight'});

                setIsButtonDisabled(false);
            })
    };
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <ToastContainer
                    containerId="topRight"
                    style={{ width: "fit-content" }}
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                    transition={Bounce}
                />
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <KeyOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={ handleSubmit } noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loading={ isButtonDisabled }
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <ToastContainer
                            containerId="bottomCenter"
                            style={{ width: "fit-content" }}
                            position="bottom-center"
                            autoClose={2500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                            theme="light"
                            transition={Bounce}
                        />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
