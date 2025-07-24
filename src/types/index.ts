import type z from "zod"
import type { consultSchema, dateSchema, pacientSchema } from "../utils/utils.schema"

export type DateForm = {
    cedula: string
    nombres: string
    correo: string
    telefono: string
    fecha: string
    hora: string
    motivo: string
}


//* Pacientes
export type Pacient = z.infer<typeof pacientSchema>
export type PacientForm = Pick<Pacient, "cedula_paciente" | "diagnostico" | "tratamiento" | "observaciones" | "cita_id" | "fecha">

//* Citas / Agendamientos
export type DatePacient = z.infer<typeof dateSchema>

//* Consultas
export type Consult = z.infer<typeof consultSchema>
export type ConsultForm = Pick<Consult, "cedula_paciente" | "diagnostico" | "tratamiento" | "observaciones" | "cita_id" | "fecha">


//* Facturas
export type FacturaForm = {
    cedula_paciente: string
    valor: string
    descripcion: string
    consulta_id: string
    fecha: string
}