import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import AppTheme from '../../components/shared/AppTheme'
import ColorModeSelect from '../../components/shared/ColorModeSelect'
import { SitemarkIcon } from '../../components/CustomIcons'
import { CardSingUp, SignUpContainer } from './AuthStyles'
import type { RegisterCredentials } from '../../types/auth'

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const defaultValues = { name: '', email: '', password: '' }
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({ defaultValues })
    const onSubmit = (data: RegisterCredentials) => console.log(data)

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignUpContainer direction="column" justifyContent="space-between">
                <CardSingUp variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="name">Full name</FormLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="name"
                                        placeholder="Jon Snow"
                                        autoComplete="name"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
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
                                        autoComplete="new-password"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive updates via email."
                        />

                        <Button type="submit" fullWidth variant="contained">
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </CardSingUp>
            </SignUpContainer>
        </AppTheme>
    )
}
