import { array, boolean, number, object, string } from "zod";

//* |--------------------| | User | |--------------------|
export const userSchema = object({
    id: number(),
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
    cedula_paciente: string(),
    diagnostico: string(),
    tratamiento: string(),
    observaciones: string(),
    cita_id: number(),
    fecha: string(),
    id: number(),
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

//* |--------------------| | Factures | |--------------------|

export const factureSchema = object({
    cedula_paciente: string(),
    valor: number(),
    descripcion: string(),
    consulta_id: number(),
    fecha: string(),
    id: number(),
})

export const allFacturesSchema = array(factureSchema)