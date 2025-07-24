import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import type { User } from "../types/auth";
import type { ConsultForm, Pacient } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConsult, getAllConsultsByCI } from "../service/pacientes.api";
import { useForm } from "react-hook-form";
import ConsultFormData from "../components/ConsultForm";
import { toast } from "react-toastify";
import ConsultDetails from "../components/ConsultDetails";
import Preloader from "../components/Preloader";

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
    800: 'hsl(210, 100%, 16%)',
}


export default function ConsultsPage() {
    //* States
    const [user, setUser] = useState<User | null>(null)
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    const [cedula, setCedula] = useState<Pacient['cedula_paciente']>('')

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (!userStorage) {
            navigate('/')
            return
        }
        setUser(JSON.parse(userStorage))
        setChecking(false)
    }, [navigate])

    //* Query
    const queryClient = useQueryClient()
    const { data: consults, isLoading } = useQuery({
        queryKey: ['pacientes'],
        queryFn: () => getAllConsultsByCI({ ci: cedula }),
        enabled: !!cedula && cedula !== '' && !!user
    })

    //* hooks
    const defaultValues: ConsultForm = {} as ConsultForm
    const { register, handleSubmit, formState, reset, setValue } = useForm<ConsultForm>({ defaultValues })

    const { mutate, isPending } = useMutation({
        mutationFn: createConsult,
        onSuccess: (data) => {
            toast.success('Consulta creada')
            queryClient.invalidateQueries({ queryKey: ['pacientes'] })
            navigate(location.pathname, { replace: true })
            reset()
            if (data) setCedula(data.cedula_paciente)
        },
        onError: () => {
            toast.error('Error al crear consulta')
        },
    })

    const onSubmit = (data: ConsultForm) => {
        console.log(data)
        mutate({ consultData: data })

    }

    if (checking) return <Preloader />
    return (
        <>
            <header id="home" className="relative">
                <div className="header-wrapper">
                    <div className="header-top theme-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="header-top-left text-center text-md-left">
                                        <ul className="flex justify-end">
                                            <li>
                                                <Link
                                                    className="text-white hover:underline mr-4"
                                                    to="/medic"
                                                >
                                                    Citas
                                                </Link>
                                                <Link
                                                    className="text-white hover:underline mr-4"
                                                    to="/"
                                                    onClick={() => localStorage.clear()}
                                                >
                                                    Cerrar Sesión
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main
                className="min-h-screen flex flex-col md:flex-row px-4 py-6"
                style={{ backgroundColor: brand[50] }}
            >
                {/* Formulario y búsqueda */}
                <div className="flex-1 max-w-md w-full bg-white p-6 rounded shadow mb-6 md:mb-0">
                    <h2
                        className="text-2xl font-semibold mb-6"
                        style={{ color: brand[400] }}
                    >
                        Busacar Consulta
                    </h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            className="w-full border rounded px-3 py-2 block mb-1 font-medium"
                            placeholder="Cedula Paciente"
                        />
                    </div>
                    <h2
                        className="text-2xl font-semibold mb-6"
                        style={{ color: brand[400] }}
                    >
                        Crear Consulta
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Campo para cédula */}
                        <ConsultFormData
                            register={register}
                            formState={formState}
                            isPending={isPending || isLoading}
                            setValue={setValue}
                            setCedula={setCedula}
                        />
                    </form>
                </div>

                {/* Listado de consultas */}
                <div
                    className="w-full md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll px-4"
                    style={{ backgroundColor: brand[50] }}
                >

                    {consults && consults.length > 0 ? (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                Listado de Consultas
                            </h2>
                            <p className="text-xl mt-2 mb-8 text-center">
                                Administra tus{' '}
                                <span style={{ color: brand[400] }}>Consultas</span> y pacientes
                            </p>

                            {consults.map((consult) => (
                                <ConsultDetails key={consult.id} consult={consult} />
                            ))}
                        </>
                    ) : (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                No hay consultas
                            </h2>
                            {isLoading ? <p>Cargando...</p> :
                                <p className="text-xl mt-2 mb-8 text-center">
                                    Busca una cédula para ver las{' '}
                                    <span style={{ color: brand[400] }}>consultas</span>
                                </p>
                            }
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
