import type { Consult, ConsultForm, DateForm, DatePacient } from "../types"
import api from "../lib/axios"
import { allConsultsSchema, allDatesSchema, consultSchema } from "../utils/utils.schema"

type AppApi = {
   reservationDate: DateForm
   consultData: ConsultForm
   ci: Consult['cedula_paciente']
   idDate: DatePacient['id']
}

//* posts
export const reservarCita = async ({ reservationDate }: Pick<AppApi, 'reservationDate'>) => {
   try {
      const url = `/citas/reservar`;
      await api.post(url, reservationDate);
      return "Cita reservada exitosamente"
   } catch (error) {
      console.log(error)
   }
}


export const agendarCita = async ({ reservationDate }: Pick<AppApi, 'reservationDate'>) => {
   try {
      const url = `/citas/`;
      await api.post(url, reservationDate);
      return "Cita reservada exitosamente"
   } catch (error) {
      console.log(error)
   }
}


//* gets
export const getAllDates = async () => {
   try {
      const url = `/citas/`;
      const { data } = await api.get(url);

      const response = allDatesSchema.safeParse(data)
      if (!response.success) {
         console.log(response.error)
         return [] as DatePacient[]
      }

      return response.data
   } catch (error) {
      console.log(error)
      return [] as DatePacient[]
   }
}


//*? Consults
export const createConsult = async ({ consultData }: Pick<AppApi, 'consultData'>) => {
   try {
      const url = `/consultas/`;
      const { data } = await api.post(url, consultData);
      const response = consultSchema.safeParse(data)
      if (!response.success) {
         return null
      }

      return response.data
   } catch (error) {
      console.log(error)
   }
}


export const getAllConsultsByCI = async ({ ci }: Pick<AppApi, 'ci'>) => {
   try {
      const url = `/consultas/${ci}`;
      const { data } = await api.get(url);
      const response = allConsultsSchema.safeParse(data)
      if (!response.success) {
         return [] as Consult[]
      }

      return response.data
   } catch (error) {
      console.log(error)
   }
}


export const deleteConsult = async ({ idDate }: Pick<AppApi, 'idDate'>) => {
   try {
      const url = `/citas/${idDate}`;
      await api.delete(url);
   } catch (error) {
      console.log(error)
   }
}
