
import type { DatePacient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type CitaDetailsProps = {
    cita: DatePacient
   
}


export default function DatesDetails({ cita }: CitaDetailsProps) {
    
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
               
            </div>
        </>
    );
}
