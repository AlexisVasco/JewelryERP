import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default ProtectedRoute;