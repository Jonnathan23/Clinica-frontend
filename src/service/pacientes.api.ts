import type { Consult, ConsultForm, DateForm, DatePacient, Facture, FactureForm } from "../types"
import api from "../lib/axios"
import { allConsultsSchema, allDatesSchema, allFacturesSchema, consultSchema, factureSchema } from "../utils/utils.schema"

type AppApi = {
   reservationDate: DateForm
   consultData: ConsultForm
   ci: Consult['cedula_paciente']
   idDate: DatePacient['id']
   factureData: FactureForm
   factureId: Facture['id']
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


//*? Fatura
export const createFacture = async ({ factureData }: Pick<AppApi, 'factureData'>) => {
   try {
      const url = `/facturas/`;
      await api.post(url, factureData);
   } catch (error) {
      console.log(error)
   }
}

export const getAllFactures = async () => {
   try {
      const url = `/facturas/`;
      const { data } = await api.get(url);
      const response = allFacturesSchema.safeParse(data)
      if (!response.success) {
         return [] as Facture[]
      }

      return response.data
   } catch (error) {
      console.log(error)
      return [] as Facture[]
   }
}


export const getFactureById = async ({ factureId }: Pick<AppApi, 'factureId'>) => {
   try {
      const url = `/facturas/${factureId}`;
      const { data } = await api.get(url);
      const response = factureSchema.safeParse(data)
      if (!response.success) {
         return {} as Facture
      }

      return response.data
   } catch (error) {
      console.log(error)
   }
}