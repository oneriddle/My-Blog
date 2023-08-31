"use client";

import axios, { AxiosError } from "axios";
import { FormEvent } from "react";

import { notifySuccess, notifyWarn } from "@/utils/toast";
import moment from "moment";
import { useState } from "react";
import Posts from "@/app/post/page";
import Image from "next/image";

const PostForm = ({ peticionGet }: any) => {
  const [file, setFile] = useState<File>();
  const date = moment().add(3, "days").calendar();

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!file) return;

      const formData = new FormData(e.currentTarget);

      const data = new FormData(e.currentTarget);
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const imageURL = await res.text();
        console.log("Se subio la imagen" + imageURL);
      }

      const postResponse = await axios.post("/api/blog", {
        titulo: formData.get("titulo"),
        autor: formData.get("autor"),
        fecha: formData.get("fecha"),
        url: `/images/upload/${file.name}`,
        contenido: formData.get("contenido"),
      });
      notifySuccess("Post creado");
      peticionGet();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyWarn(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="text">Nuevo Post</div>
          <form onSubmit={handdleSubmit}>
            <div className="form-row">
              <div className="input-data">
                <input type="text" name="titulo" required />
                <div className="underline"></div>
                <label htmlFor="">Título</label>
              </div>
              <div className="input-data">
                <input type="text" name="autor" required />
                <div className="underline"></div>
                <label htmlFor="">Autor</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="file"
                  name="file"
                  onChange={(event) => setFile(event.target.files?.[0])}
                  required
                />
                <div className="underline"></div>
                <label htmlFor=""></label>
              </div>
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="MiImagen"
                  width={100}
                  height={100}
                />
              )}
              {/* <div className="input-data">
                <input type="text" name="url" required />
                <div className="underline"></div>
                <label htmlFor="">Imagen URL</label>
              </div> */}
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  /*               rows="8"
                  cols="80" */
                  name="contenido"
                  required
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="">Contenido</label>
              </div>
            </div>
            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Postear" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default PostForm;
