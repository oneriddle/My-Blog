"use client";

import { notifyInfo, notifySuccess, notifyWarn } from "@/utils/toast";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const onChange = () => {
    setShowPass(!showPass);
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    notifyInfo("Cargando... ⏳");
    e.preventDefault();
    const body = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: body.get("email"),
      password: body.get("password"),

      redirect: false,
    });

    if (res?.error) return notifyWarn(res.error as string);

    if (res?.ok) {
      notifySuccess("Bienvenido");
      return router.push("/post");
    }
  };

  return (
    <section>
      <div className="generic_container  animate__animated animate__fadeIn blur">
        <form onSubmit={handdleSubmit}>
          <h2>Iniciar Sesion</h2>
          <p>Para administrar el Blog necesitas iniciar sesion</p>
          <Image
            src="/images/Icons/Login.webp"
            className="arrow"
            width={100}
            height={100}
            alt={"Image"}
          />
          <input className="m-1" placeholder="Email" name="email" required />
          <div className="password-row">
            <input
              placeholder="Password"
              name="password"
              className="m-1"
              required
              type={showPass ? "text" : "password"}
              id="password"
            />
            <div onClick={onChange}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/6642/6642206.png"
                className="eye"
                width={25}
                height={25}
                alt="eye"
                onClick={() => onChange}
              />
            </div>
          </div>
          <button className="button-generic m-2" type="submit">
            Iniciar Sesion
          </button>
        </form>
        <div className="register_link_container">
          <p>¿Aún no tienes una cuenta?</p>
          <Link className="register_link" href={"/signup"}>
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
