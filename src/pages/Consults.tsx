import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import type { User } from "../types/auth";
import type { Pacient } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllConsultsByCI } from "../service/pacientes.api";


export default function ConsultsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()
    const [cedula, setCedula] = useState<Pacient['cedula_paciente']>('')

    const { data: consults, isLoading } = useQuery({
        queryKey: ['pacientes'],
        queryFn: () => getAllConsultsByCI({ ci: cedula }),
        enabled: !!cedula && cedula !== ''
    })

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (!userStorage) {
            navigate('/')
            return
        }
        setUser(JSON.parse(userStorage))
        setChecking(false)
    }, [navigate])



    if (checking) return <p>Cargando...</p>
    return (
        <>
            <header id="home" className="relative">
                <div className="header-wrapper">
                    <div className="header-top theme-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="header-top-left text-center text-md-left">
                                        <ul className="flex justify-end">
                                            <li>
                                                <Link
                                                    className="text-white hover:underline mr-4"
                                                    to="/"
                                                    onClick={() => localStorage.clear()}
                                                >
                                                    Cerrar Sesión
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div>
                    <input type="text" onChange={(e) => setCedula(e.target.value)} placeholder="Buscar consultas por Cedula" />
                </div>
                {isLoading ? <p>Cargando...</p> : (
                    <>
                        {consults && consults.map((cita) => (
                            <>
                                <div>
                                    <p>{cita.cedula_paciente}</p>
                                    <p>{cita.diagnostico}</p>
                                    <p>{cita.tratamiento}</p>
                                    <p>{cita.observaciones}</p>
                                </div>
                            </>
                        ))
                        }
                    </>
                )
                }
            </main >
        </>
    );
}
