import { Box, Button, Stack, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


const ErrorMessage = styled(Typography)(() => ({
    color: 'red'
}))

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [success, setSuccess] = useState('')

    const handleSave = () => {
        setSuccess('Successfully logged in')
    }

    useEffect(() => {
        if (errors.email || errors.password) {
            setSuccess('')
        }
    }, [errors.email, errors.password])

    return (
        <Box sx={{
            width: 'auto',
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
        }}>
            {
                !success && (
                    <Box sx={{ width: '450px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", p: 4 }}>
                        <Typography variant='h4' align='center' mb={2}>Login</Typography>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Stack spacing={2} justifyContent={'center'}>
                                <TextField data-testid="email" type='email' label={'Email'}  {...register('email', { required: 'Email is required' })} />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                <TextField data-testid="password" type='password' label={'password'} {...register('password', { required: 'Password is required' })} />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                                <Button type='submit' variant='contained' data-testid="submit-button">Submit</Button>

                            </Stack>
                        </form>
                    </Box>
                )
            }

            {success && (
                <>
                    <Typography variant='h5' color={'green'} fontWeight={'bold'}>{success}</Typography>
                </>
            )}
        </Box>
    )
}

export default LoginForm