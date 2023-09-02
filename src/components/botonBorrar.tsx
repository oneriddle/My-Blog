"use client";

import { notifyError, notifySuccess } from "@/utils/toast";
import Image from "next/image";

const BotonBorrar = ({ id, peticionGet }: any) => {
  const borrarPost = async () => {

    try {
      const confirmado = confirm(
        "¿ Estás seguro ? esta operación no se puede deshacer"
      );
  
      if (confirmado) {
        const res = await fetch(`/api/blog/${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          peticionGet();
          notifySuccess("Post Eliminado!");
        }
        if (!res.ok) {
          notifyError("No hay conexión")
        }
      }
      
    } catch (error) {
      notifyError("No hay conexión")
      
    }
  };

  return (
    <>
      <Image
        src="https://cdn-icons-png.flaticon.com/512/1522/1522068.png"
        width={30}
        height={30}
        alt="borrar"
        title="Borrar"
        style={{ cursor: "pointer" }}
        onClick={borrarPost}
      />
    </>
  );
};

export default BotonBorrar;
