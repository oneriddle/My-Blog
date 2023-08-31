/* "use client"; */

import React from "react";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import moment from "moment";
import { notifySuccess } from "@/utils/toast";

const PostForm = () => {
  const date = moment().add(3, "days").calendar();

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    const formData = new FormData(e.currentTarget);
    notifySuccess("Post creado");

    const postResponse = await axios.post("/api/blog/post", {
      titulo: formData.get("titulo"),
      autor: formData.get("autor"),
      fecha: formData.get("fecha"),
      contenido: formData.get("contenido"),
    });

    if (postResponse?.status) {
      console.log("status", postResponse?.status);
    }
  };

  return (
    <>
      <section>
        <div>
          <form onSubmit={(e) => handdleSubmit(e)}>
            <label htmlFor="">Titulo</label>
            <input type="text" name="titulo" placeholder="Titulo" />
            <label htmlFor="">Autor</label>
            <input type="text" name="autor" placeholder="Autor" />
            <label htmlFor="">Fecha</label>
            <input
              type="text"
              name="fecha"
              value={date}
              placeholder="Fecha"
              disabled
            />
            <label htmlFor="">Contenido</label>
            <input type="text" name="contenido" placeholder="Contenido" />
            <button type="submit">Postear</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PostForm;
