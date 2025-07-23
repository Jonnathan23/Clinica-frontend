import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { DateForm } from "../types";
import DateFormComponent from "../components/DateFormComponent";
import { useMutation } from "@tanstack/react-query";
import { reservarCita } from "../service/pacientes.api";
import { toast } from "react-toastify";

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
}

export default function DatesPage() {
    const defaultValues = {} as DateForm
    const { register, handleSubmit, formState, reset } = useForm<DateForm>({ defaultValues })

    const { mutate, isPending } = useMutation({
        mutationFn: reservarCita,
        onSuccess: () => {
            toast.success('Cita agendada')
            reset()
        },
        onError: () => {
            toast.error('Error al agendar cita')
        },
    })

    const onSubmit = (data: DateForm) => {
        console.log(data)
        mutate({ reservationDate: data })
    }

    return (
        <>
            <header id="home" className="relative">
                <div className="header-wrapper">
                    <div className="header-top theme-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="header-top-left text-center text-md-left">
                                        <ul className='flex flex-row items-center justify-end header--list '>
                                            <li className='flex items-center ml-2 '>
                                                <Link className='header--link' to="/">
                                                    Volver al inicio
                                                </Link>
                                            </li>
                                            <li className='flex items-center ml-4 '>
                                                <Link className='header--link' to="/login">
                                                    Iniciar Sesion
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header >

            <main
                className="min-h-screen flex flex-col justify-center px-4 main-date"
                style={{ backgroundColor: brand[50] }}
            >
                <div className="container-form">
                    <div className="flex-1 max-w-md w-full mx-auto bg-white p-6 rounded shadow">
                        <h2
                            className="text-2xl font-semibold mb-6"
                            style={{ color: brand[400] }}
                        >
                            Agendar Cita
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <DateFormComponent register={register} formState={formState} isPending={isPending} />
                        </form>
                    </div>
                    <div className=" cont-image-form-date">
                        <img className="image-form-date" src="img/form-image.jpg" alt="" />
                    </div>

                </div>

            </main>
        </>
    );
}
