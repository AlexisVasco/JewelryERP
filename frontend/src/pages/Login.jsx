import { useState } from "react";
import { login } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";

function Login() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const iniciarSesion = async () => {

        if (!usuario || !password) {
            alert("Complete todos los campos.");
            return;
        }

        try {

            const respuesta = await login({
                usuario,
                password
            });

            localStorage.setItem(
                "usuario",
                JSON.stringify(respuesta.data)
            );

            navigate("/");

        } catch (error) {

            alert("Usuario o contraseña incorrectos.");

        }

    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5"
            }}
        >

            <div
                className="table-card"
                style={{
                    width: "400px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    LuxorShop ERP
                </h1>

                <br />

                <input
                    className="form-input"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <br />

                <input
                    className="form-input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <button
                    className="form-button"
                    style={{ width: "100%" }}
                    onClick={iniciarSesion}
                >
                    Iniciar Sesión
                </button>

            </div>

        </div>

    );

}

export default Login;