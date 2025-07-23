import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotFoundLayout from "./layouts/NotFoundLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import IndexPage from "./pages/IndexPage";
import DatesPage from "./pages/DatesPage";
import MedicPage from "./pages/MedicPage";
import ConsultsPage from "./pages/Consults";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/save-date" element={<DatesPage />} />
                    <Route path="/medic" element={<MedicPage />} />
                    <Route path="/consults" element={<ConsultsPage />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>

                <Route path="*" element={<NotFoundLayout />} />
            </Routes>
        </BrowserRouter>
    );
}