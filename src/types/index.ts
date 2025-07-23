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


//* Citas / Agendamientos
export type DatePacient = z.infer<typeof dateSchema>

//* Consultas
export type Consult = z.infer<typeof consultSchema>