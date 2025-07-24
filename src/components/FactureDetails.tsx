
import type { Facture } from "../types"
import PatientDetailItem from "./PatientDetailItem"



type FactureDetailsProps = {
    facture: Facture
}

export default function FactureDetails({ facture }: FactureDetailsProps) {


    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem
                label="Cédula Paciente"
                detail={facture.cedula_paciente}
            />
            <PatientDetailItem
                label="Valor"
                detail={String(facture.valor)}
            />
            <PatientDetailItem
                label="Descripción"
                detail={facture.descripcion}
            />
            <PatientDetailItem
                label="Fecha"
                detail={facture.fecha}
            />
        </div>
    )
}