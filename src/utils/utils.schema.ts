import { array, boolean, number, object, string } from "zod";

//* |--------------------| | User | |--------------------|
export const userSchema = object({
    id: string(),
    username: string(),
    token: string()
})

//* |--------------------| | Dates | |--------------------|

export const dateSchema = object({
    id: number(),
    fecha: string(),
    hora: string(),
    motivo: string(),
    cedula_paciente: string(),
    agendada_por_medico: boolean(),
})

export const allDatesSchema = array(dateSchema)


//* |--------------------| | Pacients | |--------------------|

export const pacientSchema = object({
    cedula: string(),
    nombres: string(),
    correo: string(),
    telefono: string(),
})

export const allPacientsSchema = array(pacientSchema)


//* |--------------------| | Consults | |--------------------|
export const consultSchema = object({
    cedula_paciente: string(),
    diagnostico: string(),
    tratamiento: string(),
    observaciones: string(),
    cita_id: number(),
    fecha: string(),
    id: number(),
})

export const allConsultsSchema = array(consultSchema)