import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const brand = {
    50: 'hsl(210, 100%, 95%)',
    200: 'hsl(210, 100%, 80%)',
    400: '#00ADB5' //'hsl(210, 98%, 48%)',
}

interface Slide {
    image: string
    title: string
    text: string
    buttonText: string
    buttonLink: string
}

const slides: Slide[] = [
    {
        image: '/img/slider/slider-1.jpg',
        title: 'Mision',
        text: 'Centro de traumatología y ortopedia que ofrece atención integral para mejorar la calidad de vida con técnicas mínimamente invasivas, medicina deportiva avanzada y tecnología de punta, fomentando confianza y ética.',
        buttonText: 'Agenda una cita',
        buttonLink: '/save-date',
    },
    {
        image: '/img/slider/slider-2.jpg',
        title: 'Visión',
        text: 'Ser un consultorio de traumatología líder regional y nacional, reconocido por tratamientos de excelencia, atención humana y tecnología de punta; ampliar servicios, colaboraciones y técnicas vanguardistas, fusionando medicina y empatía.',
        buttonText: 'Iniciar sesion',
        buttonLink: '/login',
    },
    {
        image: '/img/slider/slider-3.jpg',
        title: 'Tu Bienestar es nuestra Prioridad',
        text: 'Puedes agendar una cita a traves de nuestros formularios',
        buttonText: 'Nuestro servicios',
        buttonLink: '/save-date',
    },
]

export default function IndexPage() {
    const [current, setCurrent] = useState(0)
    const length = slides.length

    // autoplay cada 5s
    useEffect(() => {
        const iv = setInterval(() => {
            setCurrent((c) => (c === length - 1 ? 0 : c + 1))
        }, 5000)
        return () => clearInterval(iv)
    }, [length])

    //const prev = () => setCurrent((c) => (c === 0 ? length - 1 : c - 1))
    //const next = () => setCurrent((c) => (c === length - 1 ? 0 : c + 1))
    const goTo = (index: number) => setCurrent(index)




    return (
        <>
            <header id="home" className="relative">
                <div className="header-wrapper">
                    <div className="header-top theme-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="header-top-left text-center text-md-left">
                                        <ul className='flex flex-row items-center justify-end header--list '>
                                            <li className='flex items-center ml-2 '>
                                                <Link className='header--link' to="/save-date">
                                                    Agendar Cita
                                                </Link>
                                            </li>
                                            <li className='flex items-center ml-4 '>
                                                <Link className='header--link' to="/login">
                                                    Iniciar Sesion
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="overflow-hidden relative h-screen">
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {slides.map((s, i) => (
                            <div
                                key={i}
                                className="min-w-full h-full bg-center bg-cover relative"
                                style={{ backgroundImage: `url(${s.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/50 flex items-center">
                                    <div className="container mx-auto px-4 text-white">
                                        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                                            {s.title}
                                        </h1>
                                        <p className="mb-6 max-w-lg">{s.text}</p>
                                        <Link
                                            to={s.buttonLink}
                                            className="inline-block px-6 py-2 rounded shadow"
                                            style={{
                                                backgroundColor: brand[400],
                                                color: brand[50],
                                            }}
                                        >
                                            {s.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-10">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => goTo(idx)}
                                className="w-3 h-3 rounded-full mx-1 cursor-pointer"
                                style={{
                                    backgroundColor:
                                        idx === current ? brand[400] : brand[200],
                                }}
                            />
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}
