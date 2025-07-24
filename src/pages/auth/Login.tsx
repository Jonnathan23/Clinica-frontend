import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';


import ForgotPassword from '../../components/auth/ForgotPassword';
import AppTheme from '../../components/shared/AppTheme';
import ColorModeSelect from '../../components/shared/ColorModeSelect';
import { SitemarkIcon } from '../../components/CustomIcons';
import { Card, SignInContainer } from './AuthStyles';
import type { LoginCredentials } from '../../types/auth';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../service/auth';
import { toast } from 'react-toastify';



export default function Login(props: { disableCustomTheme?: boolean }) {
    const [openDialog, setOpenDialog] = useState(false)
    const defaultValues = { email: '', password: '' }
    const { control, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({ defaultValues })

    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            toast.success('Sesión iniciada')
            navigate('/medic')
        },
        onError: () => {
            console.log('error')
        }
    })

    const onSubmit = (credentials: LoginCredentials) => {
        console.log(credentials)
        const loginData: LoginCredentials = {
            username: credentials.username,
            password: credentials.password
        }
        mutate({ loginData })
    }

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="username">Usuario</FormLabel>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: 'Nombre de usuario requerido' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="username"
                                        type="username"
                                        placeholder="Ej. Daniel Harman"
                                        autoComplete="username"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="password"
                                        type="password"
                                        placeholder="••••••"
                                        autoComplete="current-password"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                        <ForgotPassword open={openDialog} handleClose={() => setOpenDialog(false)} />
                        <Button type="submit" fullWidth variant="contained">{!isPending ? 'Ingresar' : 'Cargando...'}</Button>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            No tienes una cuenta?{' '}
                            <Link component={RouterLink} to="/signup" variant="body2" sx={{ alignSelf: 'center' }}>
                                Regístrate
                            </Link>
                        </Typography>
                        <Typography sx={{ textAlign: 'center' }}>
                            <Link component={RouterLink} to="/" variant="body2" sx={{ alignSelf: 'center' }}>
                                Volver al inicio
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}