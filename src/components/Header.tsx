// src/components/Slider.tsx
import React, { useState, useEffect } from 'react'

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
        buttonLink: '#about',
    },
    {
        image: '/img/slider/slider-2.jpg',
        title: 'Visión',
        text: 'Ser un consultorio de traumatología líder regional y nacional, reconocido por tratamientos de excelencia, atención humana y tecnología de punta; ampliar servicios, colaboraciones y técnicas vanguardistas, fusionando medicina y empatía.',
        buttonText: 'Make Appointment',
        buttonLink: '#contact',
    },
    {
        image: '/img/slider/slider-3.jpg',
        title: 'Tu Bienestar es nuestra Prioridad',
        text: 'Puedes agendar una cita a traves de nuestros formularios',
        buttonText: 'Our Services',
        buttonLink: '#services',
    },
]

export default function Slider() {
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
    const goTo = (i: number) => setCurrent(i)

    return (
        <header id="home" className="relative">            
            <div className="header-wrapper">
                <div className="header-top theme-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="header-top-left text-center text-md-left">
                                    <ul>
                                        <li><a href="https://www.instagram.com/dr_santiago_tamayo/?hl=es" target='_blank'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#ffffffff"
                                                stroke-width="1"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                                <path d="M16.5 7.5l0 .01" />
                                            </svg>

                                            Instagram</a>
                                        </li>
                                        <li><a href="https://www.facebook.com/artromed2021/?ref=_xav_ig_profile_page_web_bt">                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#ffffffff"
                                            stroke-width="1"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                        </svg>Facebook</a></li>
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
                                    <a
                                        href={s.buttonLink}
                                        className="inline-block px-6 py-2 rounded shadow"
                                        style={{
                                            backgroundColor: brand[400],
                                            color: brand[50],
                                        }}
                                    >
                                        {s.buttonText}
                                    </a>
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
    )
}
