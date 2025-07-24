import { Link } from "react-router-dom";

export default function Header() {
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
                                                    to="/factures"
                                                >
                                                    Facturas
                                                </Link>
                                                <Link
                                                    className="text-white hover:underline mr-4"
                                                    to="/consults"
                                                >
                                                    Consultas
                                                </Link>
                                                <Link
                                                    className="text-white hover:underline mr-4"
                                                    to="/medic"
                                                >
                                                    Citas
                                                </Link>
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
        </>
    );
}
