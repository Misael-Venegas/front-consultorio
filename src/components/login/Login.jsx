"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Input, Button } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ErrorAlert from "../globals/ErrorAlert";
import { useRouter } from "next/navigation";
import ModalRecuperarContrasenha from "./ModalRecuperarContrasenha";
import jwt from "jsonwebtoken";

const Login = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [usuario, setusuario] = useState("");
    const [contrasenha, setcontrasenha] = useState("");
    const [mesgError, setMesgError] = useState("");
    const [loading, setloading] = useState(false);
    const [openModalRecuperarContrasenha, setopenModalRecuperarContrasenha] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            router.push("/productos");
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                logIn();
            }
        };
        // Añadir el evento al document
        document.addEventListener("keydown", handleKeyDown);
        // Limpiar el evento al desmontar el componente
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [usuario, contrasenha]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const logIn = async () => {
        setMesgError("");
        if (usuario === "" || contrasenha === "") {
            setMesgError("Verifica que los campos usuario y/o contraseña no estén vacíos");
            return;
        }
        const url = process.env.NEXT_PUBLIC_API_URL;
        try {
            setloading(true);
            const response = await fetch(`${url}users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contrasenha,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem("token", data.token);
                const { rol } = jwt.decode(data.token);
                console.log(rol);
                if (rol === "Especialista") {
                    router.push("/agenda");
                } else if (rol === "Administrador") {
                    router.push("/inicio");
                } else {
                    router.push("/productos");
                }
            } else {
                throw new Error("Error al iniciar sesión (token)");
            }
        } catch (error) {
            setloading(false);
            setMesgError(error.message);
        }
    };

    return (
        <>
            <div className="principal-div-login">
                <div className="div-secundario-login">
                    <p className="tituloLogin">Eyeconic mx</p>
                    <img src="/assets/Images/eyeconic_2.PNG" width={300} alt="" />
                    <Input
                        label="Usuario"
                        className="mb-3"
                        onChange={(e) => setusuario(e.target.value)}
                    />
                    <Input
                        label="Contraseña"
                        className="mb-5"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        onChange={(e) => setcontrasenha(e.target.value)}
                    />
                    <Button isLoading={loading} color="primary" style={{ width: "100%" }} onClick={logIn}>
                        Iniciar Sesión
                    </Button>
                    {mesgError !== "" && <ErrorAlert mensaje={mesgError} />}
                    <br />
                    <p
                        style={{ color: "#4B99EA" }}
                        className="seccionar-item"
                        onClick={() => setopenModalRecuperarContrasenha(true)}
                    >
                        Recuperar contraseña
                    </p>
                </div>
            </div>

            {openModalRecuperarContrasenha && (
                <ModalRecuperarContrasenha
                    openModal={openModalRecuperarContrasenha}
                    setOpenModal={setopenModalRecuperarContrasenha}
                />
            )}
        </>
    );
};

export default Login;
