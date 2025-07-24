import type { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { ConsultForm } from "../types";
import { useLocation } from "react-router-dom";
import { useEffect, type Dispatch, type SetStateAction } from "react";

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
}


type ConsultFormProps = {
    register: UseFormRegister<ConsultForm>
    formState: FormState<ConsultForm>
    isPending: boolean
    setValue: UseFormSetValue<ConsultForm>
    setCedula: Dispatch<SetStateAction<string>>
}

export default function ConsultFormData({ register, formState: { errors }, isPending, setValue, setCedula }: ConsultFormProps) {

    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const dateId = queryParams.get('dateId');
    const cedula_paciente = queryParams.get('cedula_paciente');

    useEffect(() => {
        if (dateId) {
            setValue('cita_id', +dateId)
        }
        if (cedula_paciente) {
            setValue('cedula_paciente', cedula_paciente)
            setCedula(cedula_paciente)
        }
    }, [dateId, cedula_paciente, setValue, setCedula])



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
                            value: /^\d{10}$/, // 10 dígitos
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

            {/* ID Cita */}
            <div className="mb-4">
                <label htmlFor="cita_id" className="block mb-1 font-medium">
                    ID Cita
                </label>
                <input
                    id="cita_id"
                    type="number"
                    {...register('cita_id', {
                        required: 'El ID de cita es obligatorio',
                        valueAsNumber: true,
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.cita_id && (
                    <p className="message-error mt-1">{errors.cita_id.message}</p>
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

            {/* Diagnóstico */}
            <div className="mb-4">
                <label htmlFor="diagnostico" className="block mb-1 font-medium">
                    Diagnóstico
                </label>
                <textarea
                    id="diagnostico"
                    rows={3}
                    {...register('diagnostico', {
                        required: 'El diagnóstico es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.diagnostico && (
                    <p className="message-error mt-1">{errors.diagnostico.message}</p>
                )}
            </div>

            {/* Tratamiento */}
            <div className="mb-4">
                <label htmlFor="tratamiento" className="block mb-1 font-medium">
                    Tratamiento
                </label>
                <textarea
                    id="tratamiento"
                    rows={3}
                    {...register('tratamiento', {
                        required: 'El tratamiento es obligatorio',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.tratamiento && (
                    <p className="message-error mt-1">{errors.tratamiento.message}</p>
                )}
            </div>

            {/* Observaciones */}
            <div className="mb-6">
                <label htmlFor="observaciones" className="block mb-1 font-medium">
                    Observaciones
                </label>
                <textarea
                    id="observaciones"
                    rows={4}
                    {...register('observaciones', {
                        required: 'Las observaciones son obligatorias',
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': brand[400] } as React.CSSProperties}
                />
                {errors.observaciones && (
                    <p className="message-error mt-1">{errors.observaciones.message}</p>
                )}
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="w-full py-3 rounded font-medium transition"
                style={{
                    backgroundColor: brand[400],
                    color: brand[50],
                }}
                disabled={isPending}
            >
                {isPending ? 'Cargando...' : 'Crear Consulta'}
            </button>
        </>
    );
}
