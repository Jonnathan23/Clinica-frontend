import type { UseFormRegister, FormState, UseFormSetValue } from "react-hook-form"
import type { FactureForm } from "../types"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
}

type FactureFormProps = {
    register: UseFormRegister<FactureForm>
    formState: FormState<FactureForm>
    isPending: boolean
    setValue: UseFormSetValue<FactureForm>
}

export default function FactureFormComponent({ register, formState: { errors }, isPending, setValue}: FactureFormProps) {
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const consultId = queryParams.get('consultId');
    const cedula_paciente = queryParams.get('cedula_paciente');

    useEffect(() => {
        if (consultId) {
            setValue('consulta_id', +consultId)
        }
        if (cedula_paciente) {
            setValue('cedula_paciente', cedula_paciente)
        }
    }, [consultId, cedula_paciente, setValue])
    
    return (
        <>
            {/* Cédula Paciente */}
            <div className="mb-4">
                <label htmlFor="cedula_paciente" className="block mb-1 font-medium">
                    Cédula Paciente
                </label>
                <input
                    id="cedula_paciente"
                    type="text"
                    {...register('cedula_paciente', {
                        required: 'La cédula es obligatoria',
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Debe tener 10 dígitos',
                        },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.cedula_paciente && (
                    <p className="message-error mt-1">
                        {errors.cedula_paciente.message}
                    </p>
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

            {/* Valor */}
            <div className="mb-4">
                <label htmlFor="valor" className="block mb-1 font-medium">
                    Valor
                </label>
                <input
                    id="valor"
                    type="text"
                    {...register('valor', {
                        required: 'El valor es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.valor && (
                    <p className="message-error mt-1">{errors.valor.message}</p>
                )}
            </div>

            {/* Descripción */}
            <div className="mb-4">
                <label htmlFor="descripcion" className="block mb-1 font-medium">
                    Descripción
                </label>
                <textarea
                    id="descripcion"
                    rows={3}
                    {...register('descripcion', {
                        required: 'La descripción es obligatoria',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.descripcion && (
                    <p className="message-error mt-1">{errors.descripcion.message}</p>
                )}
            </div>

            {/* ID Consulta */}
            <div className="mb-6">
                <label htmlFor="consulta_id" className="block mb-1 font-medium">
                    ID Consulta
                </label>
                <input
                    id="consulta_id"
                    type="number"
                    {...register('consulta_id', {
                        required: 'El ID de consulta es obligatorio',
                        valueAsNumber: true,
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.consulta_id && (
                    <p className="message-error mt-1">{errors.consulta_id.message}</p>
                )}
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="w-full py-3 rounded font-medium transition cursor-pointer hover:opacity-80 disabled:opacity-50"
                style={{
                    backgroundColor: brand[400],
                    color: brand[50],
                }}
                disabled={isPending}
            >
                {isPending ? 'Cargando...' : 'Crear Factura'}
            </button>
        </>
    )
}