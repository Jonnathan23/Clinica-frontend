import type { FormState, UseFormRegister } from "react-hook-form";
import type { DateForm } from "../types";

type DateFormComponentProps = {
    register: UseFormRegister<DateForm>
    formState: FormState<DateForm>
    isPending: boolean
}

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
}


export default function DateFormComponent({ register, formState: { errors }, isPending }: DateFormComponentProps) {
    return (
        <>
            <div className="mb-4">
                <label htmlFor="cedula" className="block mb-1 font-medium">
                    Cédula
                </label>
                <input
                    id="cedula"
                    type="text"
                    {...register('cedula', {
                        required: 'La cédula es obligatoria',
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Debe tener 10 dígitos',
                        },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.cedula && (
                    <p className="message-error mt-1">{errors.cedula.message}</p>
                )}
            </div>

            {/* Nombres */}
            <div className="mb-4">
                <label htmlFor="nombres" className="block mb-1 font-medium">
                    Nombres
                </label>
                <input
                    id="nombres"
                    type="text"
                    {...register('nombres', {
                        required: 'El nombre es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.nombres && (
                    <p className="message-error mt-1">{errors.nombres.message}</p>
                )}
            </div>

            {/* Correo */}
            <div className="mb-4">
                <label htmlFor="correo" className="block mb-1 font-medium">
                    Correo
                </label>
                <input
                    id="correo"
                    type="email"
                    {...register('correo', {
                        required: 'El correo es obligatorio',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Formato inválido',
                        },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.correo && (
                    <p className="message-error mt-1">{errors.correo.message}</p>
                )}
            </div>

            {/* Teléfono */}
            <div className="mb-4">
                <label htmlFor="telefono" className="block mb-1 font-medium">
                    Teléfono
                </label>
                <input
                    id="telefono"
                    type="tel"
                    {...register('telefono', {
                        required: 'El teléfono es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.telefono && (
                    <p className="message-error mt-1">{errors.telefono.message}</p>
                )}
            </div>

            {/* Fecha */}
            <div className="mb-4">
                <label htmlFor="fecha" className="block mb-1 font-medium">
                    Fecha
                </label>
                <input
                    id="fecha"
                    type="date"
                    {...register('fecha', {
                        required: 'La fecha es obligatoria',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.fecha && (
                    <p className="message-error mt-1">{errors.fecha.message}</p>
                )}
            </div>

            {/* Hora */}
            <div className="mb-4">
                <label htmlFor="hora" className="block mb-1 font-medium">
                    Hora
                </label>
                <input
                    id="hora"
                    type="time"
                    {...register('hora', {
                        required: 'La hora es obligatoria',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.hora && (
                    <p className="message-error mt-1">{errors.hora.message}</p>
                )}
            </div>

            {/* Motivo */}
            <div className="mb-6">
                <label htmlFor="motivo" className="block mb-1 font-medium">
                    Motivo
                </label>
                <textarea
                    id="motivo"
                    rows={4}
                    {...register('motivo', {
                        required: 'El motivo es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.motivo && (
                    <p className="message-error mt-1">{errors.motivo.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-3 rounded font-medium transition"
                style={{
                    backgroundColor: brand[400],
                    color: brand[50],
                }}
                disabled={isPending}
            >
                {isPending ? 'Cargando...' : 'Agendar cita'}
            </button>

        </>
    );
}
