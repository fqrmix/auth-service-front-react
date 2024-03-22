import React, { FC, useContext, useState } from "react";
import { Context } from "..";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { IErrorResponse } from "../models/IAuthResponse";
import { 
    Avatar, Box, 
    Container, createTheme, CssBaseline, 
    TextField, ThemeProvider, Typography 
} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import queryString from 'query-string';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';


export const LoginForm: FC = () => {
    const { contextStore } = useContext(Context)
    const defaultTheme = createTheme();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsButtonDisabled(true)
        const data = new FormData(event.currentTarget);
        contextStore.login(
            data.get('username')?.toString()!,
            data.get('password')?.toString()!)
            .then(() => {
                toast.success('Auth was successfull. Redirecting...')
                let redirectUrl = queryString.parse(window.location.search).redirectUrl
                if(!redirectUrl) {
                    redirectUrl = 'fqrmix.ru'
                }
                setTimeout(() => {
                    window.location.replace("https://" + redirectUrl)
                }, 3000);
                
            })
            .catch(apiError => {
                toast.error(`${apiError.message}`)
                setIsButtonDisabled(false);
            })
    };
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
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
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}