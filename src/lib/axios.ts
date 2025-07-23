import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN_KEY')
    if (token) {
        // Si no hay headers, los creamos como objeto vacío
        config.headers = config.headers ?? {};
        // Ahora sí podemos asignar Authorization sin error
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config
})

export default api