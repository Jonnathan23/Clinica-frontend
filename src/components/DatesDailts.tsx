
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DatePacient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { deleteConsult } from "../service/pacientes.api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type CitaDetailsProps = {
    cita: DatePacient

}
const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5', // tu color principal
}


export default function DatesDetails({ cita }: CitaDetailsProps) {
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: deleteConsult,
        onSuccess: () => {
            toast.info('Cita eliminada')
            queryClient.invalidateQueries({ queryKey: ['citas'] })
        }, onError: () => {
            toast.error('Error al eliminar cita')
        }
    })

    const onDelete = () => {
        mutate({ idDate: cita.id })
    }

    const generateConsult = () => {
        navigate(`/consults?dateId=${cita.id}&cedula_paciente=${cita.cedula_paciente}`)
    }


    return (
        <>
            <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
                <PatientDetailItem label="Fecha" detail={cita.fecha} />
                <PatientDetailItem label="Hora" detail={cita.hora} />
                <PatientDetailItem label="Motivo" detail={cita.motivo} />
                <PatientDetailItem
                    label="Cédula Paciente"
                    detail={cita.cedula_paciente}
                />
                <PatientDetailItem
                    label="Agendada por Médico"
                    detail={cita.agendada_por_medico ? 'Sí' : 'No'}
                />

                <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                    <button
                        type="button"
                        className="py-2 px-10 font-bold uppercase rounded-lg cursor-pointer"
                        style={{
                            backgroundColor: brand[400],
                            color: brand[50],
                        }}
                        onClick={generateConsult}
                        disabled={isPending}
                    >
                        Generar Consulta
                    </button>

                    <button
                        type="button"
                        className="py-2 px-10 font-bold uppercase rounded-lg cursor-pointer disabled:opacity-50 "
                        style={{
                            backgroundColor: brand[400],
                            color: brand[50],
                        }}
                        onClick={() => onDelete()}
                        disabled={isPending}
                    >
                        {isPending ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </>
    );
}
