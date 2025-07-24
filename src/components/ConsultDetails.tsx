import { useNavigate } from "react-router-dom"
import type { Consult } from "../types"
import PatientDetailItem from "./PatientDetailItem"

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5',
}


type ConsultDetailsProps = {
    consult: Consult
}

export default function ConsultDetails({ consult }: ConsultDetailsProps) {
    const navigate = useNavigate()

    const generateFacture = () => {
        navigate(`/factures?consultId=${consult.id}&cedula_paciente=${consult.cedula_paciente}`)
    }
    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="Fecha" detail={consult.fecha} />
            <PatientDetailItem label="Cédula Paciente" detail={consult.cedula_paciente} />
            <PatientDetailItem label="Diagnóstico" detail={consult.diagnostico} />
            <PatientDetailItem label="Tratamiento" detail={consult.tratamiento} />
            <PatientDetailItem label="Observaciones" detail={consult.observaciones} />

            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                <button
                    type="button"
                    className="py-2 px-10 font-bold uppercase rounded-lg cursor-pointer"
                    style={{
                        backgroundColor: brand[400],
                        color: brand[50],
                    }}
                    onClick={generateFacture}
                >
                    Generar factura
                </button>
            </div>
        </div>
    )
}
