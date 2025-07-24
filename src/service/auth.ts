import { toast } from "react-toastify"
import type { LoginCredentials, RegisterCredentials } from "../types/auth"
import api from "../lib/axios"
import { userSchema } from "../utils/utils.schema"

export type AuthApy = {
    signUpData: RegisterCredentials
    loginData: LoginCredentials
}

export const signUpMedic = async ({ signUpData }: Pick<AuthApy, 'signUpData'>) => {
    try {
        const url = `/auth/register`;
        await api.post(url, signUpData);
        return "Registro exitoso"
    } catch (e) {
        toast.error('Error al registrar')
        console.log(e)
    }
}


export const signIn = async ({ loginData }: Pick<AuthApy, 'loginData'>) => {
    try {
        const url = `/auth/login`;
        const { data } = await api.post(url, loginData);
        const response = userSchema.safeParse(data);
        if (!response.success) {
            throw new Error(response.error.message)
        }
        localStorage.setItem('AUTH_TOKEN_KEY', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))        
    } catch (error) {
        toast.error('Error al registrar')
        console.log(error)
    }
}