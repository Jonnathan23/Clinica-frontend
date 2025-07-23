import type { Consult, DateForm } from "../types"
import api from "../lib/axios"
import { allConsultsSchema, allDatesSchema } from "../utils/utils.schema"

type AppApi = {
   reservationDate: DateForm
   consultData: Consult
   ci: Consult['cedula_paciente']
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
         return [] as DateForm[]
      }

      return response.data
   } catch (error) {
      console.log(error)
   }
}


//*? Consults

export const createConsult = async ({ consultData }: Pick<AppApi, 'consultData'>) => {
   try {
      const url = `/consultas/`;
      await api.post(url, consultData);
      return "Cita reservada exitosamente"
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