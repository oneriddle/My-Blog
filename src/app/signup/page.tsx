"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess, notifyWarn } from "../../utils/toast";
import Link from "next/link";

const SignUpForm = ({ onLogin }: any) => {
  const [showPass, setShowPass] = useState(true);
  const router = useRouter();

  const onChange = () => {
    setShowPass(!showPass);
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
 
      const formData = new FormData(e.currentTarget);

      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) {
        notifySuccess("Registro exitoso");
        notifySuccess("Bienvenido");
        setTimeout(() => {
          return router.push("/post");
        }, 500);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError("No hay conexión")
      }
    }
  };

  return (
    <section>
      <div className="generic_container animate__animated animate__fadeIn blur">
        <form onSubmit={handdleSubmit}>
          <h2>Crear una cuenta</h2>
          <Image
            src="/images/Icons/SignUp.webp"
            className="arrow"
            alt="image"
            width={100}
            height={100}
          />

          <input
            className="m-1"
            placeholder="Nombre"
            name="fullName"
            required
          />
          <input
            className="m-1"
            placeholder="Email"
            name="email"
            required
            type="email"
          />

          <div className="password-row-signup">
            <input
              placeholder="Password"
              name="password"
              required
              type={!showPass ? "text" : "password"}
              id="password"
              /* className="m-1" */
            />

            <div onClick={onChange}>
              <Image
                src="/images/Icons/Eye.webp"
                className="eye"
                width={25}
                height={25}
                alt="eye"
                onClick={() => onChange}
              />
            </div>
          </div>

          <button className="button-generic m-3" type="submit">
            Registrarme
          </button>
        </form>
        <div className="register_link_container">
          <p>¿Ya tienes una cuenta?</p>
          <Link className="register_link" href={"/login"}>
            Inicia sesion
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
