import type { DatePacient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5', // tu color principal
}

type CitaDetailsProps = {
    cita: DatePacient
}


export default function DatesDetails({ cita }: CitaDetailsProps) {
    const onEdit = (id: number) => {
        
    }

    const onDelete = (id: number) => {
        
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
                        className="py-2 px-10 font-bold uppercase rounded-lg"
                        style={{
                            backgroundColor: brand[400],
                            color: brand[50],
                        }}
                        onClick={() => onEdit(cita.id)}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="py-2 px-10 font-bold uppercase rounded-lg"
                        style={{
                            backgroundColor: brand[400],
                            color: brand[50],
                        }}
                        onClick={() => onDelete(cita.id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
}
