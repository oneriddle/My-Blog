"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notifySuccess } from "@/utils/toast";

const BotonBorrar = ({ id, peticionGet }: any) => {
  const borrarPost = async () => {
    const confirmado = confirm(
      "¿ Estas seguro ? esta operacion no se puede deshacer"
    );

    if (confirmado) {
      const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        peticionGet();
        notifySuccess("Post Eliminado!");
      }
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
        onClick={borrarPost}
      />
    </>
  );
};

export default BotonBorrar;
