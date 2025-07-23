import { useEffect, useState } from "react";
import type { User } from "../types/auth";
import { Link, useNavigate } from "react-router-dom";
import DateFormComponent from "../components/DateFormComponent";
import type { DateForm, DatePacient } from "../types";
import { useForm } from "react-hook-form";
import { agendarCita, getAllDates } from "../service/pacientes.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DatesDetails from "../components/DatesDailts";

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
    800: 'hsl(210, 100%, 16%)',
}

export default function MedicPage() {
    const [user, setUser] = useState<User | null>(null)
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (!userStorage) {
            navigate('/')
            return
        }
        setUser(JSON.parse(userStorage))
        setChecking(false)
    }, [navigate])


    const defaultValues: DateForm = {} as DateForm
    const { register, handleSubmit, formState, reset } = useForm<DateForm>({ defaultValues })

    // Mutation para agendar cita
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: agendarCita,
        onSuccess: () => {
            toast.success('Cita agendada')
            queryClient.invalidateQueries({ queryKey: ['citas'] })
            reset()
        },
        onError: () => toast.error('Error al agendar cita'),
    })

    // Query para traer todas las citas
    const { data: citas } = useQuery<DatePacient[]>({
        queryKey: ['citas'],
        queryFn: getAllDates,
        enabled: !!user,
    })

    const onSubmit = (data: DateForm) => {
        mutate({ reservationDate: data })
    }

    if (checking) return <p>Cargando...</p>
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
                {/* Formulario */}
                <div className="flex-1 max-w-md w-full bg-white p-6 rounded shadow mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold mb-6" style={{ color: brand[400] }}>
                        Agendar Cita
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <DateFormComponent register={register} formState={formState} isPending={isPending} />
                    </form>
                </div>

                {/* Listado de citas */}
                <div
                    className="w-full md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll px-4"
                    style={{ backgroundColor: brand[50] }}
                >
                    {citas?.length ? (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                Listado de citas
                            </h2>
                            <p className="text-xl mt-2 mb-8 text-center">
                                Administra tus <span style={{ color: brand[400] }}>Citas</span> y pacientes
                            </p>
                            {citas.map((cita) => (
                                <DatesDetails key={cita.id} cita={cita} />
                            ))}
                        </>
                    ) : (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                No hay citas
                            </h2>
                            <p className="text-xl mt-2 mb-8 text-center">
                                Comienza agregando una cita{' '}
                                <span style={{ color: brand[400] }}>y aparecerá aquí</span>
                            </p>
                        </>
                    )}
                </div>
            </main>
        </>
    )
}
