import { useEffect, useState } from "react"
import type { User } from "../types/auth"
import { useNavigate } from "react-router-dom"
import type { Facture, FactureForm } from "../types"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFacture, getAllFactures } from "../service/pacientes.api"
import FactureFormComponent from "../components/FactureFormComponent"
import FactureDetails from "../components/FactureDetails"
import Header from "../components/Header"
import { toast } from "react-toastify"

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5', // color principal
    800: 'hsl(210, 100%, 16%)',
}


export default function FacturePage() {
    const [user, setUser] = useState<User | null>(null)
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (!userStorage) {
            navigate('/')
            return
        }
        setUser(JSON.parse(userStorage))
        setChecking(false)
    }, [navigate])

    const defaultValues: FactureForm = {} as FactureForm
    const { register, handleSubmit, formState, reset, setValue } = useForm<FactureForm>({ defaultValues })

    const { data: factures, isLoading } = useQuery<Facture[]>({
        queryKey: ['factures'],
        queryFn: () => getAllFactures(),
        enabled: !!user
    })
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createFacture,
        onSuccess: () => {
            toast.success('Factura creada')
            queryClient.invalidateQueries({ queryKey: ['factures'] })
            reset()
        }, onError: () => toast.error('Error al crear factura'),
    })

    const onSubmit = (data: FactureForm) => {
        console.log(data)
        mutate({ factureData: data })
    }

    if (checking) return <p>Cargando...</p>
    return (
        <>
            <Header />

            <main
                className="min-h-screen flex flex-col md:flex-row px-4 py-6"
                style={{ backgroundColor: brand[50] }}
            >
                {/* Formulario */}
                <div className="flex-1 max-w-md w-full bg-white p-6 rounded shadow mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold mb-6" style={{ color: brand[400] }}>
                        Crear Factura
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FactureFormComponent
                            register={register}
                            formState={formState}
                            isPending={isLoading}
                            setValue={setValue}
                        />
                    </form>
                </div>

                {/* Listado de facturas */}
                <div
                    className="w-full md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll px-4"
                    style={{ backgroundColor: brand[50] }}
                >
                    {factures && factures.length > 0 ? (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                Listado de Facturas
                            </h2>
                            <p className="text-xl mt-2 mb-8 text-center">
                                Administra tus{' '}
                                <span style={{ color: brand[400] }}>Facturas</span> y pacientes
                            </p>
                            {factures.map((facture) => (
                                <FactureDetails key={facture.id} facture={facture} />
                            ))}
                        </>
                    ) : (
                        <>
                            <h2
                                className="font-black text-3xl text-center mb-4"
                                style={{ color: brand[800] }}
                            >
                                {isLoading ? 'Cargando Facturas...' : 'No hay facturas'}
                            </h2>
                            {!isLoading && (
                                <p className="text-xl mt-2 mb-8 text-center">
                                    Comienza agregando una factura{' '}
                                    <span style={{ color: brand[400] }}>y aparecerá aquí</span>
                                </p>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    )
}
